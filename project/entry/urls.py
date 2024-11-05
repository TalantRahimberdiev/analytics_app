
from django.urls import path
from entry import views
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('', views.entry),
]

