from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from django.contrib.auth.models import User

from core.views import ImageMetadata, UserImages






class CustomUserCreateSerializer(UserCreateSerializer):
    def __init__(self, *args, **kwargs):
        print("Custom serializer instantiated")
        super().__init__(*args, **kwargs)
        
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('dsfsdfsdf', 'dsfsdf', 'sdfsdf', 'dsfdsfsdf')

    

class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ('id', 'email', 'username')


class ImageMetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageMetadata
        fields = ['id', 'data', 'created_at', 'updated_at']


class UserImagesSerializer(serializers.ModelSerializer):
     
     metadata = ImageMetadataSerializer()
     user = serializers.StringRelatedField(read_only=True)
     image_url = serializers.SerializerMethodField()

     class Meta:
         model = UserImages

         fields = [
            'id',
            'user',
            'image',
            'image_url',
            'metadata',
            'created_at',
            'upload_id',
            'upload_name'
        ]
         
     def get_image_url(self, obj):
        """
        Return the actual URL of the uploaded image file
        """
        request = self.context.get('request')
        if obj.image and obj.image.file:
            print(obj.image.file)
            return request.build_absolute_uri(obj.image.file.url)
        return None

    

    
    







# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'email')
        


# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, required=True)
#     password2 = serializers.CharField(write_only=True, required=True)
    
#     class Meta:
#         model = User
#         fields = ('username', 'password', 'password2', 'email')
        
#     def validate(self, attrs):
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError({"password": "Password fields didn't match."})
#         return attrs
        
#     def create(self, validated_data):
#         validated_data.pop('password2')
#         user = User.objects.create_user(**validated_data)
#         return user