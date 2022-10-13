from sys import prefix
from rest_framework.routers import DefaultRouter

from delivery.api.views import DeliveryApiViewSet

router_delivery = DefaultRouter()

router_delivery.register(
    prefix='delivery', basename='delivery', viewset=DeliveryApiViewSet
)
