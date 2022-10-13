from rest_framework.serializers import ModelSerializer

from delivery.models import Delivery


class DeliverySerializer(ModelSerializer):
    class Meta:
        model = Delivery
        fields = ['id', 'name', 'address', 'phone',
                  'indicaciones', 'created_at', 'close']
