from dataclasses import fields
from rest_framework import serializers

from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name',
                  'last_name', 'password', 'is_active', 'is_staff']
