# Generated by Django 4.0.6 on 2022-10-12 01:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('delivery', '0002_delivery_close_delivery_created_at'),
        ('orders', '0002_order_payment'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='delivery',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='delivery.delivery'),
        ),
    ]
