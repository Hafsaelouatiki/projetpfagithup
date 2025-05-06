from django.shortcuts import render

from rest_framework import viewsets
from .models import Client, Veterinaire, Animal, RendezVous
from .serializers import ClientSerializer, VeterinaireSerializer, AnimalSerializer, RendezVousSerializer

# Vue pour gérer les clients
class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

# Vue pour gérer les vétérinaires
class VeterinaireViewSet(viewsets.ModelViewSet):
    queryset = Veterinaire.objects.all()
    serializer_class = VeterinaireSerializer

# Vue pour gérer les animaux
class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

# Vue pour gérer les rendez-vous
class RendezVousViewSet(viewsets.ModelViewSet):
    queryset = RendezVous.objects.all()
    serializer_class = RendezVousSerializer
