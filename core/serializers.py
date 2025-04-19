from djoser.serializers import UserCreateSerializer, UserSerializer
from django.contrib.auth.models import User






class CustomUserCreateSerializer(UserCreateSerializer):
    def __init__(self, *args, **kwargs):
        print("Custom serializer instantiated")
        super().__init__(*args, **kwargs)
        
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('dsfsdfsdf', 'dsfsdf', 'sdfsdf', 'dsfdsfsdf')

    



class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ('id', 'email', 'username')

    

    
    







# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'email')
        


# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, required=True)
#     password2 = serializers.CharField(write_only=True, required=True)
    
#     class Meta:
#         model = User
#         fields = ('username', 'password', 'password2', 'email')
        
#     def validate(self, attrs):
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError({"password": "Password fields didn't match."})
#         return attrs
        
#     def create(self, validated_data):
#         validated_data.pop('password2')
#         user = User.objects.create_user(**validated_data)
#         return user