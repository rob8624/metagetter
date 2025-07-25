"""
URL configuration for metagetter project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path

from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from core.views import UserProfileCachedView,  CustomJWTCreateView, FilePondProcessView, CanUploadImagesView, UserImagesViewSet
from rest_framework_simplejwt.views import TokenBlacklistView

router = DefaultRouter()
router.register(r'api/images', UserImagesViewSet, basename='user-images')

urlpatterns = [
    path('', include('core.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/jwt/create/', CustomJWTCreateView.as_view(), name='jwt-create'),
    path('auth/', include('djoser.urls.jwt')),
    path('api/user-profile/', UserProfileCachedView.as_view(), name='user-profile-cached'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('fp/process/', FilePondProcessView.as_view(), name="filepond_process"),
    path('api/can-upload', CanUploadImagesView.as_view(), name='can_upload' ),
    path('', include(router.urls)),
    re_path(r'^fp/', include('django_drf_filepond.urls')),
    path('admin/', admin.site.urls),
]
