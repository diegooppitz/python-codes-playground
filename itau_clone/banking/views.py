# from rest_framework import generics
from .models import Account
from .serializers import AccountSerializer, CreditCardSerializer
from rest_framework.generics import CreateAPIView, RetrieveAPIView, DestroyAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger('django')



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

class CreditCardCreate(APIView):
    def post(self, request, format=None):
        logger.info(f"Request data: {request.data}")
        serializer = CreditCardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)