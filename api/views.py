from django.http import Http404, JsonResponse
from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login, logout as auth_logout

# LOGIN VIEW ENDPOINT


def login(request):
    return JsonResponse({"type": "login"}, safe=True)


def register(request):
    return JsonResponse({"type": "register"}, safe=True)
