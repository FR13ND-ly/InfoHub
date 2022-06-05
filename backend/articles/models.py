from django.conf import settings
from django.db import models
from django.utils import timezone

class Article(models.Model):
    title = models.TextField()
    subtitle = models.TextField(null=True)
    text = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    draft = models.BooleanField(default = True)
    framework = models.BooleanField(default = True)
    hideViews = models.BooleanField(default = False)
    hideLikes = models.BooleanField(default = False)
    hideDate = models.BooleanField(default = False)
    restrictComments = models.BooleanField(default = False)
    tags = models.TextField()
    url = models.TextField()
    coverImage = models.PositiveIntegerField(null= True)
    coverImageDescription = models.TextField(default='')
    views = models.PositiveIntegerField(default = 0)

    def __str__(self):
        return self.title + " #" + str(self.id)