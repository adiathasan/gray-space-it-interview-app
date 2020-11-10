from django.http import Http404, JsonResponse
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login, logout as auth_logout
from rest_framework.viewsets import ModelViewSet
from .models import UserProfile
from .serializers import UserProfileSerializer


class UserProfileViewSet(ModelViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
