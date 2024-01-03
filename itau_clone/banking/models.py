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