from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404

from bank_tariffs.models import Bank, Loan
from bank_tariffs.serializers import Bank_Ser, Loan_Ser

@api_view(['GET'])
def get_bank_with_tariffs(request,pk):
    if request.method == 'GET':
        bank = Bank.objects.filter(id = pk).values()
        loans=Loan.objects.filter(bank_id = pk).values()
        return Response({'loan':[loans,bank]})

    return Response(loans.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_tariff_by_entry_id(request,entry_id):
    if request.method == 'GET':
        loan=Loan.objects.filter(entry_id = entry_id).values()
        return Response(loan)
    return Response(loan.errors, status=status.HTTP_400_BAD_REQUEST)

class BanksView(APIView):

    def get(self, request, format=None):
        banks= Bank.objects.all()
        serializer=Bank_Ser(banks, many=True)
        return Response(serializer.data)

    def get_bank_by_pk(self, pk):
        try:
            return Bank.objects.get(id=pk)
        except Bank.DoesNotExist:
            raise Http404

    def post(self, request):
        data = request.data
        serializer = Bank_Ser(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        bank = self.get_bank_by_pk(pk)
        serializer = Bank_Ser(bank, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        bank = self.get_bank_by_pk(pk)
        bank.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TariffsView(APIView):

    def get_loan_by_pk(self, entry_id):
        try:
            return Loan.objects.get(entry_id=entry_id)
        except Loan.DoesNotExist:
            raise Http404

    def post(self, request):
        data = request.data
        serializer = Loan_Ser(data=data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, entry_id, format=None):
        loan = self.get_loan_by_pk(entry_id)
        serializer = Loan_Ser(loan, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, entry_id, format=None):
        loan = self.get_loan_by_pk(entry_id)
        loan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)