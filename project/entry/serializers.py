
from rest_framework import serializers
from .models import Entry


class Entry_Ser(serializers.ModelSerializer):
    class Meta:
      model = Entry
      fields = ( '__all__' )
