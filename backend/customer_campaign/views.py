
# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404

from customer_campaign.models import TargetCustomer, CampaignInfo
from customer_campaign.serializers import TargetCustomer_Ser, CampaignInfo_Ser

@api_view(['GET'])
def get_customer_with_campaigns(request,pk):
    if request.method == 'GET':
        customer = TargetCustomer.objects.filter(id = pk).values()
        campaigns=CampaignInfo.objects.filter(targetCustomer_id = pk).values()
        return Response({'customer_campaigns':[customer,campaigns]})

    return Response(campaigns.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_campaign_by_campaign_no(request,campaign_no):
    if request.method == 'GET':
        campaign=CampaignInfo.objects.filter(campaign_no = campaign_no).values()
        return Response(campaign)
    return Response(campaign.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_customer_by_pk(request,pk):
    if request.method == 'GET':
        customer=TargetCustomer.objects.filter(id = pk).values()
        return Response(customer)
    return Response(customer.errors, status=status.HTTP_400_BAD_REQUEST)

class TargetCustomerView(APIView):

    def get(self, request, format=None):
        customers= TargetCustomer.objects.all()
        serializer=TargetCustomer_Ser(customers, many=True)
        return Response(serializer.data)

    def get_customer_by_pk(self, pk):
        try:
            return TargetCustomer.objects.get(id=pk)
        except TargetCustomer.DoesNotExist:
            raise Http404

    def post(self, request):
        data = request.data
        serializer = TargetCustomer_Ser(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        customer = self.get_customer_by_pk(pk)
        serializer = TargetCustomer_Ser(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        customer = self.get_customer_by_pk(pk)
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CampaignInfoView(APIView):

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