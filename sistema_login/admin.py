from django.contrib import admin
from . import models
from .forms import UserChangeForm, UserCreationForm
from django.contrib.auth import admin as admin_auth


@admin.register(models.Usuario)
class UsuarioAdmin(admin_auth.UserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    model = models.Usuario
    fieldsets = admin_auth.UserAdmin.fieldsets + (
        ("Profile Pic", {"fields": ("img",)}),
    )  # type: ignore
