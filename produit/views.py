from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from .models import Produit
from .serializers import ProduitSerializer
from rest_framework.pagination import PageNumberPagination

@api_view(['POST'])
def login_view(request):
    # Récupérer le nom d'utilisateur et le mot de passe depuis la requête
    username = request.data.get('username')
    password = request.data.get('password')

    # Authentifier l'utilisateur
    user = authenticate(request, username=username, password=password)
    if user is not None:
        # Si l'utilisateur est authentifié, générer ou récupérer un token
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        # Si l'authentification échoue, retourner un message d'erreur
        return Response({'message': 'Identifiants invalides'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Seuls les utilisateurs authentifiés peuvent accéder
def get_produits(request):
    # Initialiser le pagineur
    paginator = PageNumberPagination()
    paginator.page_size = 5  # Nombre de produits par page
    
    # Récupérer tous les produits
    produits = Produit.objects.all()
    
    # Paginer les produits
    result_page = paginator.paginate_queryset(produits, request)
    
    # Sérialiser les produits paginés
    serializer = ProduitSerializer(result_page, many=True)
    
    # Retourner la réponse paginée avec les données sérialisées
    return paginator.get_paginated_response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Seuls les utilisateurs authentifiés peuvent créer des produits
def create_produit(request):
    # Créer un sérialiseur avec les données de la requête
    serializer = ProduitSerializer(data=request.data)
    if serializer.is_valid():
        # Si les données sont valides, enregistrer le produit dans la base de données
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    # Si les données ne sont pas valides, retourner les erreurs
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_produit(request, pk):
    try:
        # Tenter de récupérer le produit avec l'identifiant donné
        produit = Produit.objects.get(pk=pk)
    except Produit.DoesNotExist:
        # Si le produit n'existe pas, retourner un message d'erreur
        return Response({'message': 'Produit non trouvé'}, status=status.HTTP_404_NOT_FOUND)
    
    if request:
        # Récupérer les données de la requête
        nom = request.data.get('nom')
        desc = request.data.get('description')
        prix = request.data.get('prix')
        
        # Mettre à jour les champs du produit si les nouvelles valeurs sont fournies
        if nom:
            produit.nom = nom
            
        if desc:
            produit.description = desc
        
        if prix:
            produit.prix = prix
    
        # Enregistrer les modifications dans la base de données
        produit.save()
        # Récupérer le produit mis à jour
        produitfin = Produit.objects.get(pk=pk)
        # Sérialiser le produit mis à jour
        serializer = ProduitSerializer(produitfin)

        # Retourner les données sérialisées du produit mis à jour
        return Response(serializer.data, status=status.HTTP_200_OK)
    # Si la requête n'est pas valide, retourner les erreurs
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_produit(request, pk):
    try:
        # Tenter de récupérer le produit avec l'identifiant donné
        produit = Produit.objects.get(pk=pk)
    except Produit.DoesNotExist:
        # Si le produit n'existe pas, retourner un message d'erreur
        return Response({'message': 'Produit non trouvé'}, status=status.HTTP_404_NOT_FOUND)

    # Supprimer le produit de la base de données
    produit.delete()
    # Retourner une réponse avec le statut HTTP 204 No Content
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    # Vérifier si l'utilisateur est authentifié
    if request.auth:
        # Supprimer le token de l'utilisateur authentifié
        request.auth.delete()
    # Retourner un message de succès de déconnexion
    return Response({'message': 'Déconnexion réussie'}, status=status.HTTP_200_OK)