
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from entry.models import Entry
from entry.serializers import Entry_Ser

@api_view(['GET'])
def entry(request):
    if request.method == 'GET':
        data = Entry.objects.all()
        serializer = Entry_Ser(data, context={'request': request}, many=True)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
