from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from core.models import UserImages


class Command(BaseCommand):
     help = "Delete user images older than 24 hours"

     def handle(self, *args, **kwargs):
            cutoff = timezone.now() - timedelta(hours=24)

            expired = UserImages.objects.filter(created_at__lt=cutoff)

            count = expired.count()

            for img in expired:
                if img.image:
                    img.image.file.delete(save=False)  # delete file from storage

            expired.delete()

            self.stdout.write(self.style.SUCCESS(f"Deleted {count} expired images"))