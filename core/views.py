#general python utilities
import json
import os

#django responses
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.generic import View

#django models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

#project models
from .models import UserImages

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

#drf imports
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response



#memcahce
from pymemcache.client.base import Client









# Create your views here.

User = get_user_model()

def home(request):
    return HttpResponse('HELLO')



class UserProfileCachedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id 

        client = Client(('memcached', 11211))

        cache_key = f'user_profile_{user_id}'
        cached_data = client.get(cache_key)

        if cached_data:
            return Response(json.loads(cached_data.decode('utf-8')))
        else:
            return Response('Error getting data')
        
            




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
        response = super().post(request)

        if response.status_code == 200:
            upload_id = response.data

            try:
                temp_upload = TemporaryUpload.objects.get(upload_id=upload_id)
                stored_image = store_upload(
                    temp_upload.upload_id,
                    os.path.join(temp_upload.upload_id, temp_upload.upload_name)
                )

                user_image = UserImages.objects.create(
                    user=request.user,
                    image=stored_image, 
                    upload_id=upload_id,
                    upload_name=temp_upload.upload_name
                )
                print("UserImage created:", user_image)

            except TemporaryUpload.DoesNotExist:
                print("Temp upload does not exist for upload_id:", upload_id)
            except Exception as e:
                print("Unexpected error during UserImage creation:", e)

        return response