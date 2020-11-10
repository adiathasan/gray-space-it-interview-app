from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError


class UserForm(UserCreationForm):

    class Meta():
        model = User
        fields = ("first_name", "last_name", "username",
                  "email", "password1",  "password2")

    def clean_first_name(self):
        first_name = self.cleaned_data['first_name'].lower()

        if len(first_name) == 0:
            raise ValidationError("first name can not be empty")
        return first_name

    def clean_last_name(self):
        last_name = self.cleaned_data['last_name'].lower()

        if len(last_name) == 0:
            raise ValidationError("last name can not be empty")
        return last_name

    def clean_email(self):
        email = self.cleaned_data['email'].lower()

        if len(email) == 0:
            raise ValidationError("please provide a valid email.")
        return email
