from django.contrib import admin


from .models import Patient, Veterinaire, Service, RendezVous

admin.site.register(Patient)
admin.site.register(Veterinaire)
admin.site.register(Service)
admin.site.register(RendezVous)
