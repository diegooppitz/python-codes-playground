from django.urls import path
from .views import AccountCreate, AccountDetail, AccountDelete, AccountsList, CreditCardCreate, CreditCardDelete

urlpatterns = [
    path('accounts/create/', AccountCreate.as_view(), name='account-create'),
    path('accounts/delete/<str:account_id>/', AccountDelete.as_view(), name='account-delete'),
    path('accounts/<str:account_id>/', AccountDetail.as_view(), name='account-detail'),
    path('accounts/', AccountsList.as_view(), name='account-list'),
    path('credit-card/', CreditCardCreate.as_view(), name='credit-card-create'),
    path('credit-card/delete/<str:card_number>/', CreditCardDelete.as_view(), name='credit-card-delete'),
]