import json
from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
# from .serializers import RegisterSerializer, UserSerializer
from pymemcache.client.base import Client

from rest_framework_simplejwt.views import TokenObtainPairView
from django.utils import timezone
from rest_framework.response import Response
from django.contrib.auth import get_user_model




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