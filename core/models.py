from django.db import models

# Create your models here.
class Image(models.Model):
    image = models.ImageField(upload_to='images/')

    def get_image_path(self):
        return self.image.path
    
    def __str__(self):
        return "Image"