from django.db import models
from colorfield.fields import ColorField
# Create your models here.

class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    color = ColorField(default="#FFFFFF")

    def __str__(self):
        return self.name
    
class Cocktail(models.Model):
    name = models.CharField(max_length=255)

    ingredient_1 = models.ForeignKey(Ingredient, related_name='ingredient_1', on_delete=models.SET_NULL, null=True)
    ingredient_1_amount = models.FloatField(default=0.0)

    ingredient_2 = models.ForeignKey(Ingredient, related_name='ingredient_2', on_delete=models.SET_NULL, null=True, blank=True)
    ingredient_2_amount = models.FloatField(null=True, blank=True)

    ingredient_3 = models.ForeignKey(Ingredient, related_name='ingredient_3', on_delete=models.SET_NULL, null=True, blank=True)
    ingredient_3_amount = models.FloatField(null=True, blank=True)

    ingredient_4 = models.ForeignKey(Ingredient, related_name='ingredient_4', on_delete=models.SET_NULL, null=True, blank=True)
    ingredient_4_amount = models.FloatField(null=True, blank=True)

    ice = models.BooleanField(default=False)

    def __str__(self):
        return self.name