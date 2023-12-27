from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from .models import BankAccount
from .serializers import BankAccountSerializer

class BankAccountListCreate(ListCreateAPIView):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer

    def get(self, request, *args, **kwargs):
        data = { 'id': 10, 'name': 'Will Johnson', 'balance': 10000 }
        return Response(data)