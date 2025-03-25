from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from . import views 
# from . views import RegisterView 


urlpatterns = [
    path('', views.home, name='home'), 
    

    # path('api/register/', RegisterView.as_view(), name='register'),
]