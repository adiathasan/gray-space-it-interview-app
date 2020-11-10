from rest_framework.serializers import ModelSerializer
from .models import UserProfile


class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'email', 'password')
        extra_kwargs = {
            "password": {"write_only": True, "style": {'input_type': "password"}}
        }

    def create(self, validated_data):
        user = UserProfile.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
