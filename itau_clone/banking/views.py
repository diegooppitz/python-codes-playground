# from rest_framework import generics
from .models import Account, CreditCard
from django.db import transaction
from .serializers import AccountSerializer, CreditCardSerializer
from rest_framework.generics import CreateAPIView, RetrieveAPIView, DestroyAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging
from decimal import Decimal, InvalidOperation

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

class PixTransferAPIView(APIView):
    def post(self, request, *args, **kwargs):
        sender_account_id = request.data.get('sender_account_id')
        recipient_account_id = request.data.get('recipient_account_id')

        try:
            amount = Decimal(request.data.get('amount'))
        except (ValueError, TypeError, InvalidOperation):
            return Response({'error': 'Invalid amount format'}, status=status.HTTP_400_BAD_REQUEST)

        if amount <= 0:
            return Response({'error': 'Amount must be greater than 0'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                sender_account = Account.objects.select_for_update().get(account_id=sender_account_id)
                recipient_account = Account.objects.select_for_update().get(account_id=recipient_account_id)

                if sender_account.balance < amount:
                    return Response({'error': 'Insufficient funds'}, status=status.HTTP_400_BAD_REQUEST)

                sender_account.balance -= amount
                recipient_account.balance += amount
                sender_account.save()
                recipient_account.save()

                return Response({'message': 'Transfer successful'}, status=status.HTTP_200_OK)
        except Account.DoesNotExist:
            return Response({'error': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CreditCardCreate(APIView):
    def post(self, request, format=None):
        logger.info(f"Request data: {request.data}")
        serializer = CreditCardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CreditCardDelete(DestroyAPIView):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
    lookup_field = 'card_number'