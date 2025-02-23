from .views import create_produit, delete_produit, get_produits, login_view, logout_view, update_produit
from django.urls import path

urlpatterns = [
    path('login/', login_view, name='login'), ## URL de la connexion des utilisateurs
    path('produits/', get_produits, name='get_produits'), ## URL de la liste des produits
    path('logout/', logout_view, name='logout'), ## URL de la déconnexion
    path('nouveau/produit/', create_produit, name='create_produit'), ## URL de la création d'un produit
    path('affiche/produit/<int:pk>/', update_produit, name='view_produit'), ## URL de l'affichage et de la modification d'un produit
    path('supprime/produit/<int:pk>/', delete_produit, name='delete_produit'), ## URL de suppression d'un produit
]