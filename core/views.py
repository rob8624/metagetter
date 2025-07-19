#general python utilities
import json
import os
import time
import random

#django responses
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.generic import View
from django.http import JsonResponse

#django models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

#project models
from .models import UserImages, ImageMetadata

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

#drf imports
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

#exitool
import exiftool
#Exiftool helpers
from core.pyexiftool_helpers import get_all_metadata

#memcahce
from pymemcache.client.base import Client









# Create your views here.

User = get_user_model()

def home(request):
    return HttpResponse('HELLO')



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
    




   


class FilePondProcessView(ProcessView):
    permission_classes = [IsAuthenticated]

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
                        metadata_dict = get_all_metadata(temp_file_path)
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

                except TemporaryUpload.DoesNotExist:
                    print("Temp upload does not exist for upload_id:", upload_id)
                except Exception as e:
                    print("Unexpected error during UserImage creation:", e)

        return response
    


class CanUploadImagesView(APIView):
        permission_classes = [IsAuthenticated]

        def get(self, request):
            user = request.user
            image_count = user.profile.images_uploaded
            can_upload = image_count < 5
            return Response({'can_upload': can_upload})