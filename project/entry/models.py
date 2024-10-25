
from django.db import models

class Entry(models.Model):
   name=models.CharField(max_length=100, null=True)
   description=models.CharField(max_length=300, null=True)

   def __str__(self):
      return (self.name)