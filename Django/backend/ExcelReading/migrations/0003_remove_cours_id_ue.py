# Generated by Django 3.0.5 on 2020-05-05 05:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ExcelReading', '0002_auto_20200501_2018'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cours',
            name='id_ue',
        ),
    ]
