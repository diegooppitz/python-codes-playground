# from rest_framework import generics
from .models import Account
from .serializers import AccountSerializer
from rest_framework.generics import CreateAPIView, RetrieveAPIView, DestroyAPIView, ListAPIView


class AccountsList(ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class AccountDetail(RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    lookup_field = 'account_id'

class AccountCreate(CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class AccountDelete(DestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    lookup_field = 'account_id'