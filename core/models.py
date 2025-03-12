from django.db import models
from metagetter.storage_backends import PublicMediaStorage

# Create your models here.
class Image(models.Model):
    image = models.ImageField(storage=PublicMediaStorage())

    def get_image_path(self):
        return self.image.path
    
    def __str__(self):
        return self.image.name