from django.contrib.auth import forms
from .models import Usuario


class UserChangeForm(forms.UserChangeForm):
    class Meta(forms.UserChangeForm.Meta):  # type: ignore
        model = Usuario


class UserCreationForm(forms.UserCreationForm):
    class Meta(forms.UserCreationForm.Meta):  # type: ignore
        model = Usuario
