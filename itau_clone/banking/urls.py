from django.urls import path, re_path
from .views import AccountCreate, AccountDetail, AccountDelete, AccountsList

urlpatterns = [
    path('accounts/create/', AccountCreate.as_view(), name='account-create'),
    path('accounts/<str:account_id>/', AccountDetail.as_view(), name='account-detail'),
    path('accounts/delete/<str:account_id>/', AccountDelete.as_view(), name='account-delete'),
    path('accounts/', AccountsList.as_view(), name='account-list'),
]