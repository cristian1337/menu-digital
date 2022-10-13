from dataclasses import fields
from rest_framework import serializers

from categories.models import Category


class categorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'image']
