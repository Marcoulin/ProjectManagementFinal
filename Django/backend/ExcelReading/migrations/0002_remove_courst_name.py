# Generated by Django 3.0.4 on 2020-03-28 10:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ExcelReading', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='courst',
            name='name',
        ),
    ]
