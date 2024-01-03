from django.urls import path, re_path
from .views import AccountCreate, AccountDetail
from django.views.generic import TemplateView

urlpatterns = [
    path('account/create/', AccountCreate.as_view(), name='account-create'),
    path('account/<str:account_id>/', AccountDetail.as_view(), name='account-detail'),
]