from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models


class CustomUserManager(UserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The email field is required.")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            **extra_fields,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user


class User(AbstractUser):
    username = None

    email = models.EmailField(
        unique=True,
    )

    full_name = models.CharField(
        max_length=150,
    )

    ACCOUNT_TYPE_CHOICES = [
        ("customer", "Customer"),
        ("business", "Business"),
    ]

    account_type = models.CharField(
        max_length=20,
        choices=ACCOUNT_TYPE_CHOICES,
        default="customer",
    )

    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        blank=True,
        null=True,
    )

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email