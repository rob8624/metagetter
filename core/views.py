#general python utilities
import json
import os
import time
import random
import requests
import io
from collections import defaultdict
import logging

#django responses
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, FileResponse
from django.views.generic import View



#django models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


#project models
from .models import UserImages, ImageMetadata, Profile, Questions

#django utils
from django.utils import timezone


#filepond
from django_drf_filepond.views import ProcessView
from django_drf_filepond.models import TemporaryUpload, StoredUpload
from django_drf_filepond.api import store_upload

#drf auth
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.decorators import user_passes_test
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny

#drf imports
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView

#serializers
from .serializers import UserImagesSerializer, ImageListSerializer, MetadataEditSerializer,  QuestionsSerializer

#exitool
import exiftool
#Exiftool helpers
from core.pyexiftool_helpers import get_all_metadata, get_all_metadata_text, MetaDataHandler

#memcahce
from pymemcache.client.base import Client

#project helpers
from core.helper_functions import create_message, handle_task
from core.task_helpers import TaskAction
from core.utils import get_client_ip











# Create your views here.
logger = logging.getLogger(__name__)


User = get_user_model()

def home(request):
    return HttpResponse('HELLO')


class ImageLimitPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        image_count = UserImages.objects.filter(user=request.user).count()
        if image_count >= 4:
            raise PermissionDenied(detail="Upload limit of 4 images reached.")
        return True


class UserProfileCachedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        user = request.user
        
        fresh_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'active': user.is_active,
            'date_joined': user.date_joined.isoformat(),
            'uploaded_images': user.profile.count_total_images(),  # Fresh count!
            'last_login': user.last_login.isoformat() if user.last_login else None,
        }
        print(fresh_data)
        
      
        
        return JsonResponse(fresh_data)
        
            




#auth views
#overiding view to add last_login to user on token creation
class CustomJWTCreateView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            login_field = request.data.get('username')
            try:
                user = User.objects.get(username=login_field)  
                user.last_login = timezone.now()
                user.save(update_fields=['last_login'])
                response.data['userdata'] = {}
                response.data['userdata']['username'] = user.username
                response.data['userdata']['joined_date'] = str(user.profile.joined_date)  
                response.data['userdata']['images_uploaded'] = user.profile.images_uploaded 
                response.data['userdata']['active'] = user.profile.active

                ip_address = get_client_ip(request)
                logger.info("user logged in", extra={'user_id':user.username, "ip": ip_address})
                

            except User.DoesNotExist:
                print(f'User not found with username: {login_field}')
            except Exception as e:
                print(f'Error updating last_login: {e}')
        return response
    



#View to process uploaded file. It calls the ProcessView and returns a custom response.
class FilePondProcessView(ProcessView):
    permission_classes = [IsAuthenticated, ImageLimitPermission]

    def post(self, request):
        user = request.user
        ip_address = request.META.get("REMOTE_ADDR", "-")

        if user.profile.images_uploaded >= 5:
            logger.warning("Upload attempt over limit", extra={'user_id': user.username, "ip": ip_address})
            return HttpResponse("Upload limit reached", status=500)

        try:
            response = super().post(request)
            if response.status_code != 200:
                logger.warning("FilePond post returned non-200", extra={'user_id': user.username, "ip": ip_address})
                return response

            upload_id = response.data

            # Get temp_upload first
            temp_upload = TemporaryUpload.objects.get(upload_id=upload_id)

            # Process metadata safely
            metadata_obj = None
            try:
                temp_file_path = temp_upload.file.path
                handler = MetaDataHandler(temp_file_path, temp_upload, "-j")
                data = handler.get_metadata()
                metadata_dict = handler.process_metadata(data)
                metadata_obj = ImageMetadata.objects.create(data=metadata_dict)
            except Exception as e:
                logger.error(f"Metadata extraction failed: {e}", extra={'user_id': user.username, "ip": ip_address})

            # Store the upload
            stored_image = store_upload(
                temp_upload.upload_id,
                os.path.join(user.username, temp_upload.upload_id, temp_upload.upload_name)
            )

            # Create UserImages object
            user_image = UserImages.objects.create(
                user=user,
                image=stored_image,
                upload_id=upload_id,
                upload_name=temp_upload.upload_name,
                metadata=metadata_obj
            )

            # Update profile image count
            user.profile.count_total_images()

            # Delete temp file
            temp_upload.delete()

            # LOGS
            ip_address = get_client_ip(request)
            logger.info("User uploaded image", extra={'user_id': user.username, "ip": ip_address, 'image_name': temp_upload.upload_name})

        except TemporaryUpload.DoesNotExist:
            logger.error(f"Temp upload not found for upload_id: {upload_id}", extra={'user_id': user.username, "ip": ip_address})
        except Exception as e:
            # This will catch the 'source_file' and other unexpected errors
            logger.exception(f"Unexpected error during UserImage creation: {e}", extra={'user_id': user.username, "ip": ip_address})

        return response
    


class CanUploadImagesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Use the same logic as ImageLimitPermission, but non-blocking
        permission = ImageLimitPermission()
        try:
            can_upload = permission.has_permission(request, self)
        except Exception:
            can_upload = False

        return Response({'can_upload': can_upload})
        

class UserImagesViewSet(viewsets.ModelViewSet):
    serializer_class = UserImagesSerializer
    permission_classes = [IsAuthenticated]
    

    def get_queryset(self):
        return UserImages.objects.filter(user=self.request.user)
    
    def get_serliazer_class(self):
        if self.action == 'list':
            return ImageListSerializer
        return UserImagesSerializer 
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)

        profile = request.user.profile
        profile.count_total_images()
        profile.save()

        #logging
        ip_address = get_client_ip(request)
        logger.info("User deleted image", extra={'user_id': request.user.username, "ip": 
                                                 ip_address, 'image_name': instance.upload_name})
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=True)
    def metadata(self, request, pk=None):
        obj = self.get_object() 
        print('image obj from view', obj)
        url = obj.image.file.url
        task = request.query_params.get('task', 'no task')
        print(task)
        result = TaskAction(task, obj).handle_task()
        return FileResponse(
        result["file"],
        as_attachment=True,
        filename=result["file_name"],
        content_type=result["content_type"])

    

           
        


    @action(detail=True, methods=['patch'])
    def editmetadata(self, request, pk=None):
        image_object = self.get_object()
       
        serializer = MetadataEditSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {
                    'error': 'Validation failed',
                    'details': serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        validated_data = serializer.validated_data
        

        url = image_object.image.file.url
        response = requests.get(url)
        
        if response.status_code == 200:
            # Get the current metadata
            metadata = image_object.metadata.data 
            try:
                # Update only the fields that were edited
                # Map frontend field names to exiftool tag names
                field_mapping = {
                    'Description': {
                        'EXIF': 'EXIF:ImageDescription',
                        'IPTC': 'IPTC:Caption-Abstract',
                        'XMP': 'XMP:Description'
                    },
                    'Headline': {
                        'IPTC': 'IPTC:Headline',
                        'XMP': 'XMP:Headline'
                    },
                    'Keywords': {
                        'IPTC': 'IPTC:Keywords',
                        'XMP': 'XMP:Subject'
                    },
                    'Credit': {
                        'EXIF': 'EXIF:Artist',
                        'IPTC': 'IPTC:Credit',
                        'XMP': 'XMP:Credit'
                    },
                    'Category': {
                        'IPTC': 'IPTC:Category',
                        'XMP': 'XMP:Category'
                    },

                     'CreatorWorkEmail': {
                        'XMP': 'XMP:CreatorWorkEmail'},

                    'CreatorWorkURL': {
                        'XMP': ['XMP:CreatorWorkURL', 'XMP:WebStatement']},
                    
                    'Copyright': {
                        'IPTC': 'IPTC:CopyrightNotice',
                        'XMP': 'XMP:Rights'},

                    'DateCreated': {
                        'IPTC': 'IPTC:DateCreated',
                        'XMP': ['XMP:DateCreated', 'XMP:MetadataDate',
                                'XMP:CreateDate']},

                }
                
                # Update metadata with new values
                for key, value in request.data.items():
                    if key in field_mapping:
                        # Write to both IPTC and XMP
                        try:
                            iptc_key = field_mapping[key].get('IPTC')
                            xmp_key = field_mapping[key].get('XMP')
                            exif_key = field_mapping[key].get('EXIF')
                        except KeyError as e:
                            print(e, 'from mapping in writing view')
                        
                        # Handle Keywords formatting
                        if key == 'Keywords':
                            # Ensure it's a semicolon-separated string for IPTC
                            if isinstance(value, list):
                                keywords_str = ";".join(value)
                            else:
                                keywords_str = str(value)
                            metadata[0][iptc_key] = keywords_str
                            metadata[0][xmp_key] = keywords_str
                        elif isinstance(xmp_key, list):
                            for tag in xmp_key:
                                metadata[0][tag] = value
                            metadata[0][iptc_key] = value
                            
                        else:
                            # For other fields, just set the value
                            if iptc_key:
                                metadata[0][iptc_key] = value
                            if xmp_key:

                                metadata[0][xmp_key] = value
                            if exif_key:
                                metadata[0][exif_key] = value
                            
                        #print to console for debug. Has to check for date list
                        if isinstance(xmp_key, list):
                            xmp_values = {tag: metadata[0].get(tag) for tag in xmp_key}
                        else:
                            xmp_values = metadata[0].get(xmp_key)

                        print(f"Updated {key}: IPTC={metadata[0].get(iptc_key)}, XMP={xmp_values}")
            
            except Exception as e:
                print(f'Error updating metadata dictionary: {e}')
                return HttpResponse(f"Error updating metadata: {e}", status=400)
            
            # Save updated metadata to model
            try:
                image_object.metadata.data = metadata
                image_object.metadata.edited = True
                image_object.metadata.save()
                print("Metadata saved to model successfully")
            except Exception as e:
                print(f'Error saving updated data to metadata model: {e}')
                return HttpResponse(f"Error saving metadata: {e}", status=400)
            
            # Write metadata to image file
            try:
                image_bytes = response.content
                edited_metadata = metadata[0]
                
                metadata_handler = MetaDataHandler(image_bytes, image_object)
                temp_file_path = metadata_handler.write_metadata(image_bytes, image_object, edited_metadata)
                
                if not os.path.exists(temp_file_path):
                    return HttpResponse("Error: Temporary file was not created.", status=500)
                
                # Send file to client
                temp_file = open(temp_file_path, 'rb')
                try:
                    return FileResponse(
                        temp_file,
                        as_attachment=True,                  
                        filename=image_object.upload_name + "_edited_metadata",   
                        content_type='image/jpeg'            
                    )
                finally:
                    if os.path.exists(temp_file_path):
                        os.remove(temp_file_path)
                        print(f"Successfully deleted {temp_file_path} from edit view")
            
            except Exception as e:
                print(f"Error processing image: {e}")
                return HttpResponse(f"Error processing image: {e}", status=500)
        else:
            return HttpResponse('Error opening image URL', status=400)
            

            
logger.info("Logging system check", extra={"user_id": "system", "ip": "127.0.0.1"})


class QuestionListView(ListAPIView):
    serializer_class = QuestionsSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Questions.objects.filter(active=True).order_by('id')
    

       