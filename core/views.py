#general python utilities
import json
import os
import time
import random
import requests
import io
from collections import defaultdict

#django responses
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, FileResponse
from django.views.generic import View



#django models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


#project models
from .models import UserImages, ImageMetadata, Profile

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

#drf imports
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action

#serializers
from .serializers import UserImagesSerializer, ImageListSerializer

#exitool
import exiftool
#Exiftool helpers
from core.pyexiftool_helpers import get_all_metadata, get_all_metadata_text, MetaDataHandler

#memcahce
from pymemcache.client.base import Client

#project helpers
from core.helper_functions import create_message, handle_task











# Create your views here.

User = get_user_model()

def home(request):
    return HttpResponse('HELLO')


class ImageLimitPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        image_count = UserImages.objects.filter(user=request.user).count()
        if image_count >= 5:
            raise PermissionDenied(detail="Upload limit of 5 images reached.")
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
            
            # Extract username (not email since you login with username)
            login_field = request.data.get('username')
            try:
                user = User.objects.get(username=login_field)  
                user.last_login = timezone.now()
                user.save(update_fields=['last_login'])
            except User.DoesNotExist:
                print(f'User not found with username: {login_field}')
            except Exception as e:
                print(f'Error updating last_login: {e}')
        return response
    



#View to process uploaded file. It calls the ProcessView and returns a custom response.
#
   


class FilePondProcessView(ProcessView):
    permission_classes = [IsAuthenticated, ImageLimitPermission]

    def post(self, request):
        if request.user.profile.images_uploaded >= 5:
            return HttpResponse("Upload limit reached", status=500)
        else:
            response = super().post(request)

            if response.status_code == 200:
                upload_id = response.data

                try:
                    # Get temp_upload FIRST
                    temp_upload = TemporaryUpload.objects.get(upload_id=upload_id)
                    
                    # NOW you can use it for metadata extraction
                    metadata_obj = None
                    try:
                        temp_file_path = temp_upload.file.path
                        file_name = temp_upload.upload_name
                        
                        #metadata_dict = get_all_metadata(temp_file_path)
                        handler = MetaDataHandler(temp_file_path, temp_upload, "-j")
                        data = handler.get_metadata()
                        metadata_dict = handler.process_metadata(data)
                       
                        metadata_obj = ImageMetadata.objects.create(data=metadata_dict)
                    except Exception as e:
                        print(f"Error extracting metadata: {e}")

                    # Continue with storing the upload
                    stored_image = store_upload(
                        temp_upload.upload_id,
                        os.path.join(temp_upload.upload_id, temp_upload.upload_name)
                    )
                    
                    current_user = request.user
                    user_profile = current_user.profile

                    user_image = UserImages.objects.create(
                        user=current_user,
                        image=stored_image, 
                        upload_id=upload_id,
                        upload_name=temp_upload.upload_name,
                        metadata=metadata_obj 
                    )

                    
                    
                    user_profile.count_total_images()

                    temp_upload.delete()

                except TemporaryUpload.DoesNotExist:
                    print("Temp upload does not exist for upload_id:", upload_id)
                except Exception as e:
                    print("Unexpected error during UserImage creation:", e)

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

        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=True)
    def metadata(self, request, pk=None):
        obj = self.get_object() 
        url = obj.image.file.url
        task = request.query_params.get('task', 'no task')
        print(task)
        metadata = obj.metadata.data
        sorted_metadata = MetaDataHandler.group_metadata(metadata)
        content_body = handle_task(sorted_metadata, task)
        content = create_message(obj, content_body)
        file = io.BytesIO(content.encode("utf-8"))
        file.name = "metadata.txt"
        
        
        
        # image_response = requests.get(url)
        # image_bytes = image_response.content
        # #data = get_all_metadata_text(image_bytes, obj)
        # handler = MetaDataHandler(image_bytes, obj, "-all")
        # metadata_result = handler.get_metadata()
        # content = create_message(obj, metadata_result)
        # file = io.BytesIO(content.encode("utf-8"))
        # file.name = "metadata.txt"

        return FileResponse(
            file,
            as_attachment=True,
            filename="metadata.txt",
            content_type="text/plain"
        )
       
        #task = request.query_params.get('task', 'no task')


    @action(detail=True, methods=['patch'])
    def editmetadata(self, request, pk=None):
        image_object = self.get_object()
        url = image_object.image.file.url
        response = requests.get(url)
        if response.status_code == 200:
            #write edited data to metadata JSON in metadata model
            metadata = image_object.metadata.data 
            try:
                metadata[0]['XMP:Description'] = request.data['Description']
                print('new data successfully written to original metadata')
            except Exception as e:
                print(f'error writing new data to original metadata, error {e}')
            #save data to model
            try:
                image_object.metadata.data = metadata
                image_object.metadata.save()
            except Exception as e:
                print(f'error saving updated data to metadata model{e}')
            
            #get file as bytes an pass to helper
            image_bytes = response.content
            edited_metadata = metadata[0]
            metadata_handler = MetaDataHandler(image_bytes, image_object)
            temp_file_path = metadata_handler.write_metadata(image_bytes, image_object, edited_metadata)
            print(f"Temp file exists: {os.path.exists(temp_file_path)}")
            print(f"Temp file size: {os.path.getsize(temp_file_path)} bytes")
            print(f"Original bytes size: {len(image_bytes)} bytes")
            if not os.path.exists(temp_file_path):
                return HttpResponse("Error: Temporary file was not created.", status=500)
            try:
                temp_file = open(temp_file_path, 'rb')
                
                try:
                    return FileResponse(
                        temp_file,
                        as_attachment=True,                  
                        filename=image_object.upload_name,   
                        content_type='image/jpeg'            
                    )
                finally:
                    if os.path.exists(temp_file_path):
                        os.remove(temp_file_path)
                        print(f"Successfully deleted {temp_file_path} after sending to client")

            except Exception as e:
                print(f"Error sending file: {e}")
                return HttpResponse("Error: Could not send the file.", status=500)
        else:
            print('error opening image url')

        
        
        return HttpResponse('ok')

        

        
