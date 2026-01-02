from django.db import models
from django_drf_filepond.api import StoredUpload
from django.contrib.auth import get_user_model
import uuid

from django.utils import timezone

from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
from imagekit.processors import ResizeToFit


from metagetter.storage_backends import PublicMediaStorage

# Create your models here.

User = get_user_model()

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    joined_date = models.DateTimeField(auto_now_add=True)
    images_uploaded = models.PositiveIntegerField(default=0)
    active = models.BooleanField(default=True)

    def count_total_images(self):
        count = UserImages.objects.filter(user=self.user).count()
        self.images_uploaded = count
        self.save()
        return count
    


class ImageMetadata(models.Model):
    data = models.JSONField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    edited = models.BooleanField(null=True)
    downloaded = models.BooleanField(null=True)




class UserImages(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="images" )
    image = models.OneToOneField(StoredUpload, on_delete=models.SET_NULL, null=True)
    image_thumbnail = ImageSpecField(source='source_file',
                                      processors=[ResizeToFit(100, 100)],
                                      format='JPEG',
                                      options={'quality': 60})
    metadata = models.ForeignKey(ImageMetadata, on_delete=models.SET_NULL, null=True, related_name="user_images")
    created_at = models.DateTimeField(default=timezone.now) 
    upload_id = models.CharField(null=True, max_length=50)
    upload_name = models.CharField(null=True, max_length=200)
    

   

    class Meta:
        verbose_name = "User Image"
        verbose_name_plural = "User Images"
    
    def __str__(self):
        return f"{self.user.username} - {self.image.upload_id}"
    
    def delete(self, *args, **kwargs):
        if self.image and self.image.file:
            print(self.image.file)
            self.image.file.delete(save=False)

        self.image.file.delete()
            
        super().delete(*args, **kwargs)










class Image(models.Model):
    image = models.ImageField(storage=PublicMediaStorage())

    def get_image_path(self):
        return self.image.path
    
    def __str__(self):
        return self.image.name
    
