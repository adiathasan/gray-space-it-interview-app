from django.urls import path
from authentication.views import login, register

urlpatterns = [
    path('login/', login),
    path('register/', register),
]
