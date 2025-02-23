from rest_framework import serializers
from .models import Produit

## Formater les données de produit pour faciliter leur utilisation par l'API
class ProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = '__all__'