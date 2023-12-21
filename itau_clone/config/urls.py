from django.contrib import admin
from django.urls import path, include  # Importando a função include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('banking/', include('banking.urls')),  # Incluindo as URLs do app banking
]