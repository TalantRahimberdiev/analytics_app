
from django.urls import path

from customer_campaign import views

urlpatterns = [
    path('by_pk/<int:pk>/',views.get_customer_with_campaigns),
    path('customer_by_pk/<int:pk>/',views.get_customer_by_pk),
    path('', views.TargetCustomerView.as_view()),
    path('create_customer/',views.TargetCustomerView.as_view()),
    path('update_customer/<int:pk>/',views.TargetCustomerView.as_view()),
    path('delete_customer/<int:pk>/',views.TargetCustomerView.as_view()),

    path('create_campaign_manually/',views.CampaignInfoView.as_view()),
    path('update_campaign/<int:campaign_no>/',views.CampaignInfoView.as_view()),
    path('get_campaign_by_campaign_no/<int:campaign_no>/', views.get_campaign_by_campaign_no),
    path('delete_campaign/<int:campaign_no>/',views.CampaignInfoView.as_view()),
]

