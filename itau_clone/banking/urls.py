from django.urls import path
from .views import BankAccountListCreate

urlpatterns = [
    path('accounts/', BankAccountListCreate.as_view(), name='account-list-create'),
]