import json

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Profile, UserImages, Image, Questions, TermsAndConditions, UserTermsAcceptance, PrivacyPolicy


from django_summernote.admin import SummernoteModelAdmin

# Unregister the default User admin
admin.site.unregister(User)

class ProfileInline(admin.StackedInline):
    model = Profile
    readonly_fields = ('public_id_number',)

class UserImagesInline(admin.StackedInline):
    model = UserImages
    extra = 0  # Don't show extra empty forms
    can_delete = True  # Allow deletion of individual images
    readonly_fields = ['upload_id', 'created_at']  # Make some fields read-only

class UserTermsAcceptanceInline(admin.TabularInline):
    model = UserTermsAcceptance
    extra = 0
    readonly_fields = ("terms", "accepted_at", "ip_address")
    can_delete = False

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline, UserImagesInline, UserTermsAcceptanceInline)

# Register the custom User admin
admin.site.register(User, UserAdmin)

# Create a separate admin for UserImages (this is key!)
@admin.register(UserImages)
class UserImagesAdmin(admin.ModelAdmin):
    list_display = ['user', 'upload_id', 'created_at', 'get_image_name', 'get_metadata_display', 'image_url']
    list_filter = ['user', 'created_at']
    search_fields = ['user__username', 'upload_id']
    readonly_fields = ['upload_id', 'created_at', 'get_metadata_display']
    
    def get_image_name(self, obj):
        if obj.image:
            return obj.upload_name
        return "No image"
    get_image_name.short_description = "Image File"

    def get_metadata_display(self, obj):
        if obj.metadata and obj.metadata.data:
            return json.dumps(obj.metadata.data, indent=2)
        return "No metadata available"
    get_metadata_display.short_description = "Metadata (JSON)"

    def image_url(self, obj):
        return obj.image.file.url
    


@admin.register(Questions)
class QuestionsAdmin(SummernoteModelAdmin):
    list_display = ("title", "active", "created_at")
    list_filter = ("active",)
    search_fields = ("title", "content")
    summernote_fields = '__all__'

@admin.register(TermsAndConditions)
class TermsAdmin(SummernoteModelAdmin):
    summernote_fields = ('content',)
    list_display = ['version', 'is_active', 'created_at']

@admin.register(PrivacyPolicy)
class PrivacyAdmin(SummernoteModelAdmin):
    summernote_fields = ('content',)
    list_display = ['version', 'is_active', 'created_at']




admin.site.register(Image)
