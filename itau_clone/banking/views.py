# from rest_framework import generics
from .models import Account, BalanceDetail, CreditCard, CreditCardStatementDetail, Loan
from django.db import transaction
from django.http import Http404
from .serializers import AccountListSerializer, AccountSerializer, BalanceDetailSerializer, CreditCardSerializer, CreditCardStatementDetailSerializer, LoanSerializer
from rest_framework.generics import CreateAPIView, RetrieveAPIView, DestroyAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from rest_framework import status
import logging
from decimal import Decimal, InvalidOperation


logger = logging.getLogger('django')


class AccountsList(ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountListSerializer

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


class BalanceDetailView(ListAPIView):
    serializer_class = BalanceDetailSerializer

    def get_queryset(self):
        try:
            account_id = self.kwargs['account_id']
            if not Account.objects.filter(account_id=account_id).exists():
                raise Http404('Account not found')
            else:
                return BalanceDetail.objects.filter(account_number__account_id=account_id)
        except Exception as e:
            logger.error(f"Error fetching balance details: {e}")
            raise Http404('Error fetching balance details')

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.filter_queryset(self.get_queryset())
            
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error listing balance details: {e}")
            raise APIException('A server error occurred.')

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

                BalanceDetail.objects.create(
                    account_number=sender_account,
                    type="sent",
                    description="Transferência enviada",
                    amount=-amount
                )
                BalanceDetail.objects.create(
                    account_number=recipient_account,
                    type="received",
                    description="Transferência recebida",
                    amount=amount
                )


                return Response({'message': 'Transfer successful'}, status=status.HTTP_200_OK)
        except Account.DoesNotExist:
            return Response({'error': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CreditCardList(ListAPIView):
    serializer_class = CreditCardSerializer

    def get_queryset(self):
        account_id = self.kwargs.get('account_id')
        return CreditCard.objects.filter(account_number__account_id=account_id)

class CreditCardCreate(APIView):
    def post(self, request, format=None):
        logger.info(f"Request data: {request.data}")
        serializer = CreditCardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class CreditCardStatementsDetailView(ListAPIView):
    serializer_class = CreditCardStatementDetailSerializer

    def get_queryset(self):
        card_number = self.kwargs.get('card_number')
        return CreditCardStatementDetail.objects.filter(credit_card__card_number=card_number)
    
class CreditCardDelete(DestroyAPIView):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
    lookup_field = 'card_number'

class LoansAvailabilityView(APIView):
    def get(self, request, account_id):
        try:
            account = Account.objects.get(account_id=account_id)
            loans = Loan.objects.filter(account=account)
            loans_serializer = LoanSerializer(loans, many=True)

            # A lógica para determinar a disponibilidade pode variar
            # Exemplo: considerando o saldo da conta para definir a disponibilidade
            loan_availability = account.balance > Decimal('1000.00')  # Exemplo fictício
            available_amount = account.balance - Decimal('1000.00') if loan_availability else Decimal('0.00')

            return Response({
                'loans': loans_serializer.data,
                'loan_availability': loan_availability,
                'available_amount': available_amount
            })

        except Account.DoesNotExist:
            return Response({'error': 'Conta não encontrada'}, status=status.HTTP_404_NOT_FOUND)