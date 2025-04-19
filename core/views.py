from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
# from .serializers import RegisterSerializer, UserSerializer

# Create your views here.


def home(request):
    return HttpResponse('HELLO')



class UserProfileCachedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id 

        return Response(user_id)
            