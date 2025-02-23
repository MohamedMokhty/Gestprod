from django.contrib import admin
from .models import Produit

## administrer les produits
@admin.register(Produit) ## activer le menu dans la page d'administration
class ProduitAdmin(admin.ModelAdmin):  ## organiser l'affichage de la page liste
    list_display = ['nom', 'prix']
    search_fields = ['nom', 'prix']
    list_per_page = 10
    list_max_show_all = 100
    list_display_links = ['nom']
    list_editable = ['prix']
