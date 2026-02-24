from collections import defaultdict
from datetime import datetime
from django.core.validators import EmailValidator
import re

from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from django.contrib.auth.models import User

from imagekit import ImageSpec
from imagekit.processors import ResizeToFill
from imagekit.processors import ResizeToFit
from imagekit.cachefiles import ImageCacheFile


from core.views import ImageMetadata, UserImages
from core.models import Questions



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
    processors = [ResizeToFit(600, 600 )]
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
     location = serializers.SerializerMethodField()
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
            'location',
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
             summary['image_details'] = {'message': 'No EXIF data available'}
         

         
         
         

         
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

         
         
         
         
         
         
             
         
         
                 
            

             


           
             
             
             
         #removes exiftool from data_types
         if 'ExifTool' in summary.get('data_types', {}):
            del summary['data_types']['ExifTool']
    
    
         
       
         return summary
     
     
     
     def get_location(self, obj):
        grouped = self._process_metadata(obj)
        exif = grouped.get('EXIF', {})
        lat = exif.get("GPSLatitude")
        lat_ref = exif.get("GPSLatitudeRef")

        lng = exif.get("GPSLongitude")
        lng_ref = exif.get("GPSLongitudeRef")

        if lat and lng:
            lat = float(lat)
            lng = float(lng)

            if lat_ref == "S":
                lat = -lat
            if lng_ref == "W":
                lng = -lng

            location_data = {
                "latitude": lat,
                "longitude": lng
            }
            return location_data
        else:
            return {'message': 'No location data available'}       
            
     
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

    
    


#MEtadata Edit serializer

class MetadataEditSerializer(serializers.Serializer):
    """
    Validates metadata fields for single image editing
    """
    Description = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=2000,
        help_text="Image description/caption"
    )
    
    Headline = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=256,
        help_text="Image headline"
    )
    
    Category = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=100,
        help_text="Image category"
    )
    
    Keywords = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=500,
        help_text="Semicolon-separated keywords"
    )
    
    Credit = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=256,
        help_text="Photo credit/byline"
    )
    
    Copyright = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=256,
        help_text="Copyright notice"
    )
    
    
   
    
    CreatorWorkEmail = serializers.EmailField(
        required=False,
        allow_blank=True,
        validators=[EmailValidator()],
        help_text="Creator's email address",
        error_messages={
            "invalid": "e.g., user@example.com"
        }
    )
    
    CreatorWorkURL = serializers.CharField(
    required=False,
    allow_blank=True,
    max_length=500,
    help_text="Creator's website URL"
)
    
    def validate_Keywords(self, value):
        """
        Validate keywords format and count
        """
        if not value:
            return value
            
        # Split by semicolon and check each keyword
        keywords = [k.strip() for k in value.split(';') if k.strip()]
        
        if len(keywords) > 50:
            raise serializers.ValidationError(
                "Too many keywords. Maximum 50 keywords allowed."
            )
        
        for keyword in keywords:
            if len(keyword) > 64:
                raise serializers.ValidationError(
                    f"Keyword '{keyword}' is too long. Max 64 characters per keyword."
                )
        
        # Return cleaned keywords
        return ';'.join(keywords)
    
    def validate_Description(self, value):
        """
        Validate description doesn't contain malicious content
        """
        if not value:
            return value
            
        # Check for suspicious patterns (basic XSS prevention)
        dangerous_patterns = ['<script', 'javascript:', 'onerror=', 'onclick=']
        value_lower = value.lower()
        
        for pattern in dangerous_patterns:
            if pattern in value_lower:
                raise serializers.ValidationError(
                    "Description contains potentially unsafe content."
                )
        
        return value.strip()
    
    
    
    def validate_CreatorWorkURL(self, value):
        if not value:
            return value

        # Check scheme
        if not value.startswith(('http://', 'https://')):
            raise serializers.ValidationError("URL must start with http:// or https://")

        # Optional: further validate URL structure
        from urllib.parse import urlparse
        parsed = urlparse(value)
        if not parsed.netloc:
            raise serializers.ValidationError("URL is invalid. Make sure it is a proper http or https URL.")

        return value
    
    
    def validate(self, data):
        """
        Object-level validation (validates entire payload)
        """
        # Ensure at least one field is being updated
        if not any(data.values()):
            raise serializers.ValidationError(
                "At least one field must be provided for update."
            )
        
        return data



class QuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ['id', 'title', 'content', 'active', 'created_at', 'updated_at']
    




