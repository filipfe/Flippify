# Generated by Django 4.1.3 on 2022-11-02 17:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Flashcards', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='answers',
            options={'verbose_name_plural': 'Answers'},
        ),
        migrations.AlterModelOptions(
            name='flashcards',
            options={'verbose_name_plural': 'Flashcards'},
        ),
    ]