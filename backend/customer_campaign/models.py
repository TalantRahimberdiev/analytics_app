from django.db import models
from django.utils import timezone

# Create your models here.

class CampaignInfo(models.Model):
    campaign_no=models.AutoField(primary_key=True)
    customer_id=models.IntegerField(null=False)
    start_date=models.DateField(null=False)
    end_date=models.DateField(null=False)
    text=models.TextField(max_length=1500)
    extra_comments=models.TextField(max_length=1055)
    employee_username = models.CharField(max_length=100, null=True)
    created_by_employee_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.campaign_no)