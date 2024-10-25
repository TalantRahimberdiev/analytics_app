
from django.urls import path
from entry import views

urlpatterns = [
    path('', views.entry),
]

