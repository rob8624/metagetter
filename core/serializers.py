from collections import defaultdict
import re

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
        fields = ['id', 'data', 'created_at', 'updated_at', 'edited']


class UserImagesSerializer(serializers.ModelSerializer):
     
     metadata = ImageMetadataSerializer()
     grouped_metadata = serializers.SerializerMethodField()
     summary_metadata = serializers.SerializerMethodField()
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
            'summary_metadata',
            'created_at',
            'upload_id',
            'upload_name'
        ]
         
     def _process_metadata(self, obj):
         """Shared method to process metadata into groups"""
         data = ImageMetadataSerializer(obj.metadata).data['data'][0]
         

         grouped_data = defaultdict(dict)

         for key, value in data.items():
            try:
                data_type, item = key.split(":")
                grouped_data[data_type][item] = value
                
            except ValueError:
                f"skipping {key}"
         return grouped_data

        
         
     def get_grouped_metadata(self, obj):
        grouped_data = self._process_metadata(obj)
        return grouped_data
     
     
     def get_summary_metadata(self, obj):
         grouped_data = self._process_metadata(obj)
          
         summary = defaultdict(dict)
         
         #dictionry of keys to iterate through grouped_data[exif] and create camera_details summary
         #values are custom names used as keys in summary_data, mapped over in frontend
         camera_keys = {'Make':'Camera Make', 
                        'Model': 'Camera Model', 
                        'SerialNumber': 'Serial#', 
                        'LensModel': 'Lens' }
         
         
         
         image_keys = {'Description': 'Description', 
                       'DateCreated': 'Creation Date', 
                       'Credit': 'Credit', 
                       'Rights': 'Copyright', 
                       'Subject': 'Keywords',
                       'Format':'Image Format'}
         creator_keys = {
                        'CreatorWorkEmail':'Email', 
                         'CreatorCountry': 'Country', 
                         'CreatorAddress': 'Address'}

         
         
         #comprehension syntax {new_key: new_value for item in iterable if condition}
         #using comprehension to creat new sumamry dictionary
         
         #the comprehension need to be made into a seperate funtion for DRYness

         for key, value in grouped_data.items():
             summary['data_types'][key] = len(value)

         if 'EXIF' in grouped_data: 
             summary['camera_details'] = {
                 custom_key: grouped_data['EXIF'][original_key]
                 for original_key, custom_key in camera_keys.items()
                 if original_key in grouped_data['EXIF']
                 }
         else:
             summary['camera_details'] = {'message': 'No EXIF data available'}
             
         
         if 'XMP' in grouped_data:
             summary['image_details'] = {
                 custom_key: grouped_data['XMP'][original_key]
                 for original_key, custom_key in image_keys.items()
                 if original_key in grouped_data['XMP']
             }
             try:
                summary['image_details']['Keywords'] = re.split(r'[,\s]+', summary['image_details']['Keywords']) #formats keywords into a list
             except KeyError:
                 print('No keywords')

             summary['creator_details'] = {
                 custom_key: grouped_data['XMP'][original_key]
                 for original_key, custom_key in creator_keys.items()
                 if original_key in grouped_data['XMP']
                }
             
         else:
             summary['camera_details'] = {'message': 'No EXIF data available'}
         

         
         
         

         
         def format_date(date:str, date_key: str, time_key:str) -> None:
            """
            Formats the date from the grouped_date dictionary
            Takes a key from summary dict and processes
            Also takes args to be used in summary_data dict to use are keys
            """            
            try:
                date_and_time = date.split(" ")
                date, time = date_and_time[0], date_and_time[1]    

                raw_date = date.split(":")
                summary['image_details']['Creation Date'] = {
                    date_key : "-".join(raw_date),
                    time_key : time
                }
                print(date)
                
                
            except Exception as e:
                print(f"Could not format data {e}")
            
         format_date(summary['image_details'].get('Creation Date'), 'Date', 'Time')

         
         
         
         
         
         
             
         
         
                 
            

             

         """ for key, value in grouped_data.items():
             summary['data_types'][key] = len(grouped_data[key])
             summary['camera_details'] = {key: grouped_data['EXIF'][key] for key in camera_keys if key in grouped_data['EXIF']}
             summary['image_details'] = {key: grouped_data['XMP'][key] for key in image_keys if key in grouped_data['XMP']}
             """

           
             
             
             
         #removes exiftool from data_types
         if 'ExifTool' in summary.get('data_types', {}):
            del summary['data_types']['ExifTool']
    
    
         
         
        #  print('grouped_daata', grouped_data)
        #  print('summer data', summary)
         return summary
     
            
         
     def get_image_url(self, obj):
        """
        Return the actual URL of the uploaded image file
        """
        request = self.context.get('request')
        if obj.image and obj.image.file:
            
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