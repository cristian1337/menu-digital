from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from categories.models import Category
from categories.api.serializers import categorySerializer


class CategoryApiViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = categorySerializer
    queryset = Category.objects.all()
