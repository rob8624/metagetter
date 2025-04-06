from django.http import JsonResponse
import json
from django.contrib.auth.models import User



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