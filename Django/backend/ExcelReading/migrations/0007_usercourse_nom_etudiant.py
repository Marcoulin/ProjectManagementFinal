# Generated by Django 3.0.5 on 2020-05-13 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ExcelReading', '0006_remove_usercourse_nom_etudiant'),
    ]

    operations = [
        migrations.AddField(
            model_name='usercourse',
            name='nom_etudiant',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
