
from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path("api/", include("accounts.urls")),
    path('admin/', admin.site.urls),
    path('bank_tariff/', include('bank_tariffs.urls')),
]
