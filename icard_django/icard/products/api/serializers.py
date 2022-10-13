from dataclasses import fields
from unicodedata import category
from rest_framework import serializers

from products.models import Product
from categories.api.serializers import categorySerializer


class productSerializer(serializers.ModelSerializer):
    category_data = categorySerializer(source='categorie', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'image', 'price',
                  'active', 'categorie', 'category_data']
