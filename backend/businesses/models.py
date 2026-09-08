from django.conf import settings
from django.db import models

class Business(models.Model):

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="businesses",
    )

    CATEGORY_CHOICES = [
        ("hotel", "Hotels & Homestays"),
        ("restaurant", "Food & Restaurants"),
        ("repair", "Repair & Mechanics"),
        ("home_service", "Home Services"),
        ("healthcare", "Healthcare"),
        ("retail", "Shops & Retail"),
        ("travel", "Travel & Transport"),
        ("beauty", "Beauty & Personal Care"),
        ("education", "Education & Training"),
        ("professional", "Professional & Digital Services"),
    ]



    name = models.CharField(max_length=200)

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
    )

    short_description = models.CharField(
        max_length=300,
        blank=True,
    )

    description = models.TextField(
        blank=True,
    )

    location = models.CharField(
        max_length=200,
    )

    phone = models.CharField(
        max_length=20,
        blank=True,
    )

    email = models.EmailField(
        blank=True,
    )

    website = models.URLField(
        blank=True,
    )

    is_verified = models.BooleanField(
        default=False,
    )

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.name


class BusinessImage(models.Model):

    business = models.ForeignKey(
        Business,
        on_delete=models.CASCADE,
        related_name="images",
    )

    image = models.ImageField(
        upload_to="business_images/",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return f"{self.business.name} Image"

class Offer(models.Model):

    business = models.ForeignKey(
        Business,
        on_delete=models.CASCADE,
        related_name="offers",
    )

    title = models.CharField(
        max_length=200,
    )

    description = models.TextField(
        blank=True,
    )

    discount = models.CharField(
        max_length=100,
        blank=True,
    )

    valid_from = models.DateTimeField()

    valid_until = models.DateTimeField()

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.title