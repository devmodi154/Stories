from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.

class Story(models.Model):
    title = models.CharField(max_length = 32)
    content = models.TextField(max_length = 1000)
    current_viewers = models.PositiveIntegerField(default=0)

    def no_of_reads(self):
        total__views = len(Reading.objects.filter(story = self, isRead = True))
        return total__views

    def current_readers(self):
        no_of_curr_readers = len(Reading.objects.filter(story = self, isCurrentlyReading = True))
        return no_of_curr_readers

class Reading(models.Model):
    story = models.ForeignKey(Story, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    isRead = models.BooleanField(default=False)
    isCurrentlyReading = models.BooleanField(default=False)
    
    class Meta:
        unique_together = (('user','story'),)
        index_together = (('user','story'),)

