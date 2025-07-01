from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Profile, UserImages, Image

# Unregister the default User admin
admin.site.unregister(User)

class ProfileInline(admin.StackedInline):
    model = Profile

class UserImagesInline(admin.StackedInline):
    model = UserImages
    extra = 0  # Don't show extra empty forms
    can_delete = True  # Allow deletion of individual images
    readonly_fields = ['upload_id', 'created_at']  # Make some fields read-only

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline, UserImagesInline)

# Register the custom User admin
admin.site.register(User, UserAdmin)

# Create a separate admin for UserImages (this is key!)
@admin.register(UserImages)
class UserImagesAdmin(admin.ModelAdmin):
    list_display = ['user', 'upload_id', 'created_at', 'get_image_name']
    list_filter = ['user', 'created_at']
    search_fields = ['user__username', 'upload_id']
    readonly_fields = ['upload_id', 'created_at']
    
    def get_image_name(self, obj):
        if obj.image:
            return obj.upload_name
        return "No image"
    get_image_name.short_description = "Image File"

# Register your Image model
admin.site.register(Image)