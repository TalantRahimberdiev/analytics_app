from django.db import models

# Create your models here.

class TargetCustomer(models.Model):
    id=models.AutoField(primary_key=True)
    customer_no=models.IntegerField()

    def __str__(self):
        return str(self.id)


class CampaignInfo(models.Model):
    campaign_no=models.AutoField(primary_key=True)
    targetCustomer_id=models.ForeignKey(TargetCustomer, on_delete=models.CASCADE, null=False)
    start_date=models.DateField(null=False)
    end_date=models.DateField(null=False)
    text=models.TextField(max_length=1500)
    extra_comments=models.TextField(max_length=1055)
    

    def __str__(self):
        return str(self.campaign_no)