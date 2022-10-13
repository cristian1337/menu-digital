from django.contrib import admin

from delivery.models import Delivery


@admin.register(Delivery)
class DeliveryAdmin(admin.ModelAdmin):
    pass
