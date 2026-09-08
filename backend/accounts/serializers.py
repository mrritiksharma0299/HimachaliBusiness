from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="A user with this email already exists.",
            )
        ],
    )

    password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    class Meta:
        model = User
        fields = [
            "email",
            "full_name",
            "account_type",
            "password",
        ]

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            full_name=validated_data["full_name"],
            account_type=validated_data["account_type"],
            password=validated_data["password"],
        )

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "full_name",
            "account_type",
            "profile_picture",
            "date_joined",
        ]
        read_only_fields = [
            "id",
            "email",
            "date_joined",
        ]