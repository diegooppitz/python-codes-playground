from django.urls import path, re_path
from .views import BankAccountListCreate
from django.views.generic import TemplateView

urlpatterns = [
    path('bank-account/', BankAccountListCreate.as_view(), name='account-data'),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]
