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


# Create your views here.


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
            