
# Create your views here.
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.http import Http404
from customer_campaign.models import CampaignInfo
from customer_campaign.serializers import CampaignInfo_Ser


@api_view(['GET'])
def get_campaign_by_campaign_no(request,campaign_no):
    if request.method == 'GET':
        campaign=CampaignInfo.objects.filter(campaign_no = campaign_no).values()
        return Response(campaign)
    return Response(campaign.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_campaigns(request):
    if request.method == 'GET':
        campaigns=CampaignInfo.objects.values()
        return Response(campaigns)
    return Response(campaigns.errors, status=status.HTTP_400_BAD_REQUEST)

class CampaignInfoView(APIView):

    def get(self, request):
        queryset = CampaignInfo.objects.all()
        serializer = CampaignInfo_Ser(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_campaign_by_pk(self, campaign_no):
        try:
            return CampaignInfo.objects.get(campaign_no=campaign_no)
        except CampaignInfo.DoesNotExist:
            raise Http404

    def post(self, request):
        data = request.data
        serializer = CampaignInfo_Ser(data=data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, campaign_no, format=None):
        campaign = self.get_campaign_by_pk(campaign_no)
        serializer = CampaignInfo_Ser(campaign, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, campaign_no, format=None):
        campaign = self.get_campaign_by_pk(campaign_no)
        campaign.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)