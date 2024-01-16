from rest_framework import serializers
from .models import Account, CreditCard


class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ['account_number', 'card_number', 'bill_date', 'month_bill', 'total_bill']

    def create(self, validated_data):
        account = validated_data.pop('account_number')

        return CreditCard.objects.create(account_number=account, **validated_data)
class AccountSerializer(serializers.ModelSerializer):

    credit_cards = CreditCardSerializer(many=True, read_only=True)

    class Meta:
        model = Account
        fields = ['name', 'account_id', 'created_at', 'balance', 'birth_date', 'credit_cards']

