from django.http import JsonResponse
import json
from django.contrib.auth.models import User

from django.contrib.auth import get_user_model
from pymemcache.client.base import Client
from django.core.cache import cache


class DuplicateEmailMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response 

    def __call__(self, request):
        if request.method == 'POST' and request.path == "/auth/users/": 
            try:
                body = json.loads(request.body)
                email = body.get('email')

                if email and User.objects.filter(email=email).exists():
                    return JsonResponse(
                        {"email": ["User with this email already exists."]}, 
                        status=400)
            except json.JSONDecodeError:
                pass

        response = self.get_response(request)  

        return response
    

class UserProfileData:
    def __init__(self, get_response):
        self.get_response = get_response
        print('using middleware')
        # Connect to memcached
        self.memcached_client = Client(('memcached', 11211))
        
    def __call__(self, request):
        # If this might be a login request, store the body content
        if request.method == 'POST' and request.path == '/auth/jwt/create/':
            try:
                # Read and store the request body before it's consumed
                body = request.body.decode('utf-8')
                request_data = json.loads(body)
                username = request_data.get('username', '')
            except Exception:
                username = ''
                request_data = {}
        else:
            username = ''
            request_data = {}
            
        # Process the request to get the response
        response = self.get_response(request)
        
        # Handle login success
        if request.method == 'POST' and request.path == '/auth/jwt/create/' and username:
            if response.status_code == 200:
                try:
                    # Parse the response data
                    response_data = json.loads(response.content.decode('utf-8'))
                    
                    if 'access' in response_data:
                        # Get the user model
                        User = get_user_model()
                        try:
                            # Get the user object
                            user = User.objects.get(username=username)
                            
                            # Get user profile data
                            user_data = {
                                'id': user.id,
                                'username': user.username,
                                'email': user.email,
                                'active' : user.is_active,
                                
                                # Add other fields you need
                            }
                            
                            # Convert dict to JSON string for storage
                            user_data_json = json.dumps(user_data)
                            
                            # Store in memcache with the user's ID as the key
                            cache_key = f'user_profile_{user.id}'
                            self.memcached_client.set(cache_key, user_data_json, expire=86400)  # 24 hours
                            
                        except User.DoesNotExist:
                            pass
                except Exception as e:
                    print(f"Error caching user profile: {str(e)}")
        
        return response