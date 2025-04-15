from django.contrib import admin
from .models import Image, Profile
from django.contrib.auth.models import User  # Import User from auth models
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


admin.site.unregister(User)


class ProfileInline(admin.StackedInline):
    model = Profile


class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,) 


admin.site.register(User, UserAdmin)  # First arg is the model, second is the admin class


admin.site.register(Image)