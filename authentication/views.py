from django.http import Http404
from django.shortcuts import render


# LOGIN VIEW ENDPOINT

def login(request):
    return render(request, 'login.html')


def register(request):
    return render(request, 'register.html')