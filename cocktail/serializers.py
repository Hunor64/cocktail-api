from rest_framework.serializers import ModelSerializer
from .models import Cocktail, Ingredient

class CocktailSerializer(ModelSerializer):
    class Meta:
        model = Cocktail
        fields = '__all__'
        depth = 1

