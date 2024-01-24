from django.shortcuts import render

from .serializers import CocktailSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Cocktail

@api_view(['GET'])
def getAllCocktails(request):
    cocktails = Cocktail.objects.all()
    ser = CocktailSerializer(cocktails, many = True)

    return Response(ser.data)