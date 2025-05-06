from django.db import models


class Client(models.Model):
    nom = models.CharField(max_length=100)
    email = models.EmailField()
    telephone = models.CharField(max_length=20)

    def __str__(self):
        return self.nom

class Veterinaire(models.Model):
    nom = models.CharField(max_length=100)
    specialite = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.nom

class Animal(models.Model):
    nom = models.CharField(max_length=100)
    espece = models.CharField(max_length=100)
    race = models.CharField(max_length=100)
    age = models.IntegerField()
    proprietaire = models.ForeignKey(Client, on_delete=models.CASCADE)

    def __str__(self):
        return self.nom

class RendezVous(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    veterinaire = models.ForeignKey(Veterinaire, on_delete=models.CASCADE)
    date = models.DateField()
    heure = models.TimeField()
    service = models.CharField(max_length=100)
    prix = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"RDV pour {self.animal.nom} avec {self.veterinaire.nom}"

