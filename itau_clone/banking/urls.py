from django.urls import path
from .views import AccountCreate, AccountDetail, AccountDelete, AccountsList, CreditCardCreate

urlpatterns = [
    path('accounts/create/', AccountCreate.as_view(), name='account-create'),
    path('accounts/<str:account_id>/', AccountDetail.as_view(), name='account-detail'),
    path('accounts/delete/<str:account_id>/', AccountDelete.as_view(), name='account-delete'),
    path('accounts/', AccountsList.as_view(), name='account-list'),
    path('credit-card/', CreditCardCreate.as_view(), name='credit-card-create'),
]