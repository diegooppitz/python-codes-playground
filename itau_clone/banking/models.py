from django.db import models
from django.utils import timezone

class Account(models.Model):
    name = models.CharField(max_length=100)
    account_id = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    birth_date = models.DateField()

    def __str__(self):
        return self.name

class CreditCard(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='credit_cards')
    card_number = models.CharField(max_length=16)
    bill_date = models.DateField()
    month_bill = models.DecimalField(max_digits=10, decimal_places=2)
    total_bill = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.account.name} - {self.card_number}"