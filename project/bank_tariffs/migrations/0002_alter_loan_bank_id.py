# Generated by Django 5.1.2 on 2024-10-24 09:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank_tariffs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loan',
            name='bank_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bank_tariffs.bank'),
        ),
    ]
