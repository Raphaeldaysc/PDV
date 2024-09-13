from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    img = models.ImageField(upload_to="perfil/%Y", blank=True, null=True)
