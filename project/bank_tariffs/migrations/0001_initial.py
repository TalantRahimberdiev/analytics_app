# Generated by Django 5.1.2 on 2024-10-18 04:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bank',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('entry_id', models.AutoField(primary_key=True, serialize=False)),
                ('interest_rate', models.DecimalField(decimal_places=3, max_digits=17)),
                ('promo_campaign_name', models.CharField(max_length=500)),
                ('url', models.URLField(max_length=300)),
                ('entry_date', models.DateField()),
                ('bank_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='bank_tariffs.bank')),
            ],
        ),
    ]
