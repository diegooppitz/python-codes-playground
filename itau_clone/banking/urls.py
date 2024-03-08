from django.urls import path
from .views import AccountCreate, AccountDetail, AccountDelete, AccountsList, BalanceDetailView, PixTransferAPIView, CreditCardList, CreditCardStatementsDetailView, CreditCardCreate, CreditCardDelete

urlpatterns = [
    path('accounts/create/', AccountCreate.as_view(), name='account-create'),
    path('accounts/delete/<str:account_id>/', AccountDelete.as_view(), name='account-delete'),
    path('accounts/<str:account_id>/', AccountDetail.as_view(), name='account-detail'),
    path('accounts/', AccountsList.as_view(), name='account-list'),
    path('accounts/<str:account_id>/balance_detail/', BalanceDetailView.as_view(), name='account-balance-detail'),
    path('pix/', PixTransferAPIView.as_view(), name='pix'),
    path('credit-cards/<str:account_id>/', CreditCardList.as_view(), name='credit-card-list'),
    path('credit-cards/create', CreditCardCreate.as_view(), name='credit-card-create'),
    path('credit-cards/delete/<str:card_number>/', CreditCardDelete.as_view(), name='credit-card-delete'),
    path('credit-cards/statements/<str:card_number>/', CreditCardStatementsDetailView.as_view(), name='credit-card-statements'),
]