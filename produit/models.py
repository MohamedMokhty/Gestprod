from django.db import models

## model Produit avec les attributs nom, prix et description
class Produit(models.Model):
    nom = models.CharField(max_length=100)
    prix = models.IntegerField()
    description = models.TextField()

    def __str__(self):
        return self.nom
