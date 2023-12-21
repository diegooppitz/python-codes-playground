from rest_framework import generics
from .models import BankAccount
from .serializers import BankAccountSerializer

class BankAccountListCreate(generics.ListCreateAPIView):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer