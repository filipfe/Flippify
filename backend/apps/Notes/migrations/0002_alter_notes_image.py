# Generated by Django 4.1.3 on 2022-11-02 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Notes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notes',
            name='image',
            field=models.ImageField(upload_to='notes'),
        ),
    ]