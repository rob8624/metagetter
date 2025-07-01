from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile, UserImages

from django_drf_filepond.models import TemporaryUpload
from django_drf_filepond.api import delete_stored_upload
from django_drf_filepond.models import StoredUpload

import os
from datetime import datetime



@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


# @receiver(post_save, sender=TemporaryUpload, dispatch_uid="store_upload") 
# def store_temporary_upload(sender, instance, created, **kwargs):
#     if created:
#         print(f"Storing upload: {instance.upload_name}")
#         # date_path = datetime.now().strftime('%Y-%m-%d')  # Changed from '%Y/%m/%d' to '%Y-%m-%d'
#         # destination = os.path.join(date_path, instance.upload_name)
        
#         su = store_upload(instance.upload_id, os.path.join(instance.upload_id, instance.upload_name))
#         print(f"Stored successfully: {su}")

# @receiver(post_save, sender=UserImages)
# def cleanup_temp_file_api(sender, instance, created, **kwargs):
#     """
#     Use django-filepond's API to clean up temporary files
#     """
#     if created:
#         try:
#             delete_stored_upload(instance.upload_id)
#             print(f"Cleaned up via API for upload_id: {instance.upload_id}")
#         except Exception as e:
#             print(f"Error cleaning up via API: {e}")