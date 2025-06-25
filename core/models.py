from django.db import models
from django.contrib.auth import get_user_model


from metagetter.storage_backends import PublicMediaStorage

# Create your models here.

User = get_user_model()

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    joined_date = models.DateTimeField(auto_now_add=True)
    images_uploaded = models.PositiveIntegerField(default=0)
    active = models.BooleanField(default=True)
    

    
class Image(models.Model):
    image = models.ImageField(storage=PublicMediaStorage())

    def get_image_path(self):
        return self.image.path
    
    def __str__(self):
        return self.image.name
    
