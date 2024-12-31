
from django.urls import path

from customer_campaign import views

urlpatterns = [
    path('get_list_campaigns/',views.list_campaigns),
    path('create_campaign_manually/',views.CampaignInfoView.as_view()),
    path('update_campaign/<int:campaign_no>/',views.CampaignInfoView.as_view()),
    path('get_campaign_by_campaign_no/<int:campaign_no>/', views.get_campaign_by_campaign_no),
    path('delete_campaign/<int:campaign_no>/',views.CampaignInfoView.as_view()),
]

