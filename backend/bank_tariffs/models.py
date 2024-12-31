from django.db import models
from django.utils import timezone

# Create your models here.


class Bank(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=500, null=False)
    employee_username = models.CharField(max_length=100)
    created_by_employee_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

class Loan(models.Model):
    entry_id = models.AutoField(primary_key=True)
    bank_id = models.ForeignKey(Bank, on_delete=models.CASCADE, null=False)
    interest_rate = models.DecimalField(decimal_places=3, max_digits=17, null=False)
    promo_campaign_name = models.CharField(max_length=500, null=False)
    url = models.URLField(max_length=300, null=False)
    entry_date = models.DateField(null=False)
    employee_username = models.CharField(max_length=100, null=True)
    created_by_employee_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "entry id:%s, %s" % (self.entry_id, self.promo_campaign_name)
