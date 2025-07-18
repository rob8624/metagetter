from django.db import models
from django_drf_filepond.api import StoredUpload
from django.contrib.auth import get_user_model
import uuid

from django.utils import timezone


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
    



class UserImages(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="images" )
    image = models.OneToOneField(StoredUpload, on_delete=models.SET_NULL, null=True)
    # metadata = models.ForeignKey(ImageMetadata, on_delete=models.SET_NULL, null=True)
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
            self.image.file.delete(save=False)
        super().delete(*args, **kwargs)


# class ImageMetadata(models.Model):
#     data = models.JSONField()
#     created_at = models.DateTimeField(default=timezone.now)







class Image(models.Model):
    image = models.ImageField(storage=PublicMediaStorage())

    def get_image_path(self):
        return self.image.path
    
    def __str__(self):
        return self.image.name
    
