from rest_framework import serializers
from .models import Account, BalanceDetail, CreditCard, CreditCardStatementDetail

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ['account_number', 'card_number', 'card_name', 'bill_date', 'month_bill', 'total_bill']

    def create(self, validated_data):
        account = validated_data.pop('account_number')

        return CreditCard.objects.create(account_number=account, **validated_data)

class CreditCardStatementDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCardStatementDetail
        fields = ['id', 'date', 'transaction_type', 'description', 'amount']



class AccountListSerializer(serializers.ModelSerializer):
    credit_cards_names = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = ['name', 'account_id', 'created_at', 'balance', 'birth_date', 'credit_cards_names']

    def get_credit_cards_names(self, obj):
        return [card.card_name for card in obj.credit_cards.all()]

class AccountSerializer(serializers.ModelSerializer):

    credit_cards = CreditCardSerializer(many=True, read_only=True)

    class Meta:
        model = Account
        fields = ['name', 'account_id', 'created_at', 'balance', 'birth_date', 'credit_cards']

class BalanceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BalanceDetail
        fields = '__all__'

