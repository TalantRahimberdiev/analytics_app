from rest_framework import serializers
from .models import CampaignInfo


class CampaignInfo_Ser(serializers.ModelSerializer):
    class Meta:
      model = CampaignInfo
      fields = ('__all__' )