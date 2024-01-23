from django.db import models
from django.utils import timezone
import random

def generate_number_id():
    return str(random.randint(10000000, 99999999))

class Account(models.Model):
    name = models.CharField(max_length=100)
    account_id = models.CharField(max_length=8, unique=True, default= generate_number_id)
    created_at = models.DateTimeField(default=timezone.now)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    birth_date = models.DateField()

    def __str__(self):
        return self.name

class CreditCard(models.Model):
    account_number = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='credit_cards', to_field='account_id')
    card_number = models.CharField(max_length=8, unique=True, default= generate_number_id)
    card_name = models.CharField(max_length=100)
    bill_date = models.CharField(max_length=2)
    month_bill = models.DecimalField(max_digits=10, decimal_places=2)
    total_bill = models.DecimalField(max_digits=10, decimal_places=2)


    def __str__(self):
        return f"{self.account_number.name} - {self.card_number}"