from rest_framework import serializers
from .models import Bank, Loan

class Bank_Ser(serializers.ModelSerializer):
    class Meta:
      model = Bank 
      fields = ( '__all__' )

class Loan_Ser(serializers.ModelSerializer):
    class Meta:
      model = Loan 
      fields = ('__all__' )