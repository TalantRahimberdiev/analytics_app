# Generated by Django 4.2.16 on 2024-12-26 17:52

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('bank_tariffs', '0002_loan_created_by_employee_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loan',
            name='created_by_employee_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
