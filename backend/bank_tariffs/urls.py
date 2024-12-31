
from django.urls import path

from bank_tariffs import views

urlpatterns = [
    path('<int:pk>/',views.get_bank_with_tariffs),
    path('', views.BanksView.as_view()),
    path('create_bank/',views.BanksView.as_view()),
    path('update_bank/<int:pk>/',views.BanksView.as_view()),
    path('delete_bank/<int:pk>/',views.BanksView.as_view()),

    path('create_tariff_manually/',views.TariffsView.as_view()),
    path('update_tariff/<int:entry_id>/',views.TariffsView.as_view()),
    path('get_tariff_by_entry_id/<int:entry_id>/', views.get_tariff_by_entry_id),
    path('delete_tariff/<int:entry_id>/',views.TariffsView.as_view()),
]


