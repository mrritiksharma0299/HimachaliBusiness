from rest_framework import serializers
from .models import Business, BusinessImage, Offer


class BusinessImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = BusinessImage
        fields = [
            "id",
            "business",
            "image",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "business",
            "created_at",
        ]


class OfferBusinessSerializer(serializers.ModelSerializer):

    images = BusinessImageSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Business
        fields = [
            "id",
            "name",
            "location",
            "images",
        ]


class OfferSerializer(serializers.ModelSerializer):

    business_details = OfferBusinessSerializer(
        source="business",
        read_only=True,
    )

    class Meta:
        model = Offer
        fields = [
            "id",
            "business",
            "business_details",
            "title",
            "description",
            "discount",
            "valid_from",
            "valid_until",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "business",
            "business_details",
            "created_at",
            "updated_at",
        ]


class BusinessSerializer(serializers.ModelSerializer):

    images = BusinessImageSerializer(
        many=True,
        read_only=True,
    )

    offers = OfferSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Business
        fields = [
            "id",
            "owner",
            "name",
            "category",
            "short_description",
            "description",
            "location",
            "phone",
            "email",
            "website",
            "is_verified",
            "is_active",
            "created_at",
            "updated_at",
            "images",
            "offers",
        ]
        read_only_fields = [
            "id",
            "owner",
            "is_verified",
            "created_at",
            "updated_at",
        ]