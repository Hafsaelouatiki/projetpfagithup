from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet, VeterinaireViewSet, AnimalViewSet, RendezVousViewSet

# Création du routeur
router = DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'veterinaires', VeterinaireViewSet)
router.register(r'animaux', AnimalViewSet)
router.register(r'rendezvous', RendezVousViewSet)

# Définition des URLs de l'app
urlpatterns = [
    path('', include(router.urls)),
]
