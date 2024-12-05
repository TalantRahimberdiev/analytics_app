from rest_framework import serializers
from .models import TargetCustomer, CampaignInfo

class TargetCustomer_Ser(serializers.ModelSerializer):
    class Meta:
      model = TargetCustomer
      fields = ( '__all__' )

class CampaignInfo_Ser(serializers.ModelSerializer):
    class Meta:
      model = CampaignInfo
      fields = ('__all__' )