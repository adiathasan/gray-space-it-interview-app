from django.http import Http404
from django.shortcuts import redirect, render
from .forms import UserForm
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login, logout as auth_logout

# LOGIN VIEW ENDPOINT


def login(request):
    if request.user.is_authenticated:
        return redirect('/')
    else:
        if request.method == 'POST':
            username = request.POST.get('username')
            password = request.POST.get('password')
            print(username, password)
            user = authenticate(request, username=username, password=password)
            if user is not None:
                auth_login(request, user)
                return redirect('/')
            else:
                messages.warning(request, ' invalid username or password')
        context = {"title": "CodeBlog | register"}
        return render(request, 'login.html', context)


def register(request):
    if request.user.is_authenticated:
        return redirect("/")
    else:
        user_form = UserForm(request.POST or None)
        if request.method == "POST" and user_form.is_valid():
            user_form.save(commit=True)
            return redirect('login')

        context = {"user_form": user_form, "title": "CodeBlog | register"}
    return render(request, 'register.html', context)


def logout(request):
    auth_logout(request)
    return redirect('login')
