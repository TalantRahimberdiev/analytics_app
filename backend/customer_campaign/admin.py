from django.contrib import admin

# Register your models here.
from .models import TargetCustomer
from .models import CampaignInfo

admin.site.register(TargetCustomer)
admin.site.register(CampaignInfo)