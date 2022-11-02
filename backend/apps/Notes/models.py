from django.db import models
from apps.Auth.models import User

class Notes(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    desc = models.CharField(max_length=255)
    image = models.ImageField(upload_to='notes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Notes'

    def __str__(self):
        return '{}'.format(
            self.pk,
        )