# Generated by Django 4.1.3 on 2022-11-02 17:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Notes', '0002_alter_notes_image'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='notes',
            options={'verbose_name_plural': 'Notes'},
        ),
    ]