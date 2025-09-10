from collections import defaultdict

from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from django.contrib.auth.models import User

from imagekit import ImageSpec
from imagekit.processors import ResizeToFill
from imagekit.cachefiles import ImageCacheFile


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


class ThumbnailSpec(ImageSpec):
    processors = [ResizeToFill(600, 400 )]
    format = 'JPEG'
    options = {'quality': 30}

# Serializers to process images as thumbnails if view is list
class ImageListSerializer(serializers.ModelSerializer):
    
    image_thumbnail_url = serializers.SerializerMethodField()
    
    class Meta:
        model = UserImages


        fields = [
            'id',
            'user',    
           'image_thumbnail_url'
           'metadata'
           'created_at',
           'upload_id',
            'upload_name'
        ]

        def get_image_thumbnail_url(self, obj):
            request = self.context.get('request')
            if obj.image and obj.image.file:
                try:
                    # Create thumbnail spec
                    thumbnail_spec = ThumbnailSpec(source=obj.image.file)
                    
                    # Create cache file from the spec
                    cache_file = ImageCacheFile(thumbnail_spec)
                    cache_file.generate()
                    
                    # Get the URL from the cache file
                    thumbnail_url = cache_file.url
                    
                    # # Debug logging
                    # print(f"Original URL: {obj.image.file.url}")
                    # print(f"Thumbnail URL: {thumbnail_url}")
                    
                    return request.build_absolute_uri(thumbnail_url)
                    
                except Exception as e:
                    print(f"Error generating thumbnail URL: {e}")
                    return request.build_absolute_uri(obj.image.file.url)
            return None









class ImageMetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageMetadata
        fields = ['id', 'data', 'created_at', 'updated_at']


class UserImagesSerializer(serializers.ModelSerializer):
     
     metadata = ImageMetadataSerializer()
     grouped_metadata = serializers.SerializerMethodField()
     user = serializers.StringRelatedField(read_only=True)
     image_url = serializers.SerializerMethodField()
     image_thumbnail_url = serializers.SerializerMethodField()

     class Meta:
         model = UserImages

         fields = [
            'id',
            'user',
            'image',
            'image_url',
            'image_thumbnail_url',
            'metadata',
            'grouped_metadata',
            'created_at',
            'upload_id',
            'upload_name'
        ]
         
     def get_grouped_metadata(self, obj):
        data = ImageMetadataSerializer(obj.metadata).data['data'][0]
        print('start of test date', data, 'serializer data')
        
        grouped_data = defaultdict(dict)

        for key, value in data.items():
            try:
                data_type, item = key.split(":")
                grouped_data[data_type][item] = value
            except ValueError:
                f"skipping {key}"

        
        print(grouped_data, 'grouped_data test from serializer')
        return grouped_data
            
         
     def get_image_url(self, obj):
        """
        Return the actual URL of the uploaded image file
        """
        request = self.context.get('request')
        if obj.image and obj.image.file:
            print(obj.image.file)
            return request.build_absolute_uri(obj.image.file.url)
        return None
     
     def get_image_thumbnail_url(self, obj):
        """Generate thumbnail URL using imagekit"""
        request = self.context.get('request')
        if obj.image and obj.image.file:
            try:
                # Create thumbnail spec
                thumbnail_spec = ThumbnailSpec(source=obj.image.file)
                
                # Create cache file from the spec
                cache_file = ImageCacheFile(thumbnail_spec)
                cache_file.generate()
                
                # Get the URL from the cache file
                thumbnail_url = cache_file.url
                
                # # Debug logging
                # print(f"Original URL: {obj.image.file.url}")
                # print(f"Thumbnail URL: {thumbnail_url}")
                
                return request.build_absolute_uri(thumbnail_url)
                
            except Exception as e:
                print(f"Error generating thumbnail URL: {e}")
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