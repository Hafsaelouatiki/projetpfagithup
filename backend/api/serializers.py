from rest_framework import serializers
from .models import Client, Veterinaire, Animal, RendezVous

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class VeterinaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Veterinaire
        fields = '__all__'

class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = '__all__'

class RendezVousSerializer(serializers.ModelSerializer):
    class Meta:
        model = RendezVous
        fields = '__all__'
