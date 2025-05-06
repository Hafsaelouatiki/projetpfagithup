
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Check, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"; 

import Paiement from '@/pages/Paiement';
import { useState } from "react";

const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null);
const [selectedDate, setSelectedDate] = useState<string>("");
const [selectedTime, setSelectedTime] = useState<string>("");
const [selectedService, setSelectedService] = useState<number | null>(null);
const [selectedVet, setSelectedVet] = useState<number | null>(null);

const AppointmentBooking = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [selectedPet, setSelectedPet] = useState<string | undefined>(undefined);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [selectedVet, setSelectedVet] = useState<string | undefined>(undefined);
  const [note, setNote] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();


  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const pets = [
    { id: '1', name: 'Max', species: 'Chien', breed: 'Labrador' },
    { id: '2', name: 'Felix', species: 'Chat', breed: 'Européen' }
  ];

  const services = [
    { id: 'consultation', name: 'Consultation générale', duration: '30 min', price: '50€' },
    { id: 'vaccination', name: 'Vaccination', duration: '30 min', price: '75€' },
    { id: 'checkup', name: 'Bilan de santé', duration: '45 min', price: '90€' },
    { id: 'emergency', name: 'Urgence', duration: '60 min', price: '120€' }
  ];

  const vets = [
    { id: '1', name: 'Dr. Emma Rousseau', speciality: 'Médecine générale' },
    { id: '2', name: 'Dr. Thomas Bernard', speciality: 'Chirurgie' }
  ];

  const handleNextStep = () => {
    if (step === 1 && (!selectedDate || !selectedTime)) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une date et une heure pour votre rendez-vous",
        variant: "destructive"
      });
      return;
    }

    if (step === 2 && (!selectedPet || !selectedService)) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un animal et un service",
        variant: "destructive"
      });
      return;
    }

    if (step === 3 && !selectedVet) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un vétérinaire",
        variant: "destructive"
      });
      return;
    }

    if (step < 5) {
      setStep(step + 1);
    } else {
      toast({
        title: "Paiement effectué",
        description: "Merci pour votre réservation. À bientôt !"
      });
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Prendre un Rendez-vous</h1>
          <p className="mt-2 text-gray-600">Réservez facilement un rendez-vous pour votre animal de compagnie</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Choisissez une date et une heure'}
              {step === 2 && 'Informations sur votre animal et le service souhaité'}
              {step === 3 && 'Choisissez un vétérinaire'}
              {step === 4 && 'Confirmez votre rendez-vous'}
              {step === 5 && 'Paiement'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Sélectionnez une date disponible et un créneau horaire'}
              {step === 2 && 'Indiquez quel animal sera vu et pour quel service'}
              {step === 3 && 'Choisissez le vétérinaire qui vous recevra'}
              {step === 4 && 'Vérifiez les informations de votre rendez-vous'}
              {step === 5 && 'Finalisez votre réservation en effectuant le paiement'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Date du rendez-vous</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="border rounded-md"
                    locale={fr}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today || date.getDay() === 0;
                    }}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Heure du rendez-vous</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`p-2 text-center rounded-md border ${
                          selectedTime === time ? 'bg-vet-blue text-white border-vet-blue' : 'hover:border-vet-blue'
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="mb-2 block">Choisissez votre animal</Label>
                  <RadioGroup value={selectedPet} onValueChange={setSelectedPet} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pets.map((pet) => (
                      <div key={pet.id} className="relative">
                        <RadioGroupItem
                          value={pet.id}
                          id={`pet-${pet.id}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`pet-${pet.id}`}
                          className="flex p-4 border rounded-md cursor-pointer hover:border-vet-blue peer-checked:border-vet-blue peer-checked:bg-vet-blue/5"
                        >
                          <div className="flex-1">
                            <div className="font-medium">{pet.name}</div>
                            <div className="text-sm text-gray-500">{pet.species} - {pet.breed}</div>
                          </div>
                          <CheckCircle className={`h-5 w-5 ${selectedPet === pet.id ? 'text-vet-blue' : 'text-transparent'}`} />
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-2 block">Choisissez un service</Label>
                  <RadioGroup value={selectedService} onValueChange={setSelectedService} className="space-y-2">
                    {services.map((service) => (
                      <div key={service.id} className="relative">
                        <RadioGroupItem
                          value={service.id}
                          id={`service-${service.id}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`service-${service.id}`}
                          className="flex p-4 border rounded-md cursor-pointer hover:border-vet-blue peer-checked:border-vet-blue peer-checked:bg-vet-blue/5"
                        >
                          <div className="flex-1">
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-gray-500">{service.duration} - {service.price}</div>
                          </div>
                          <CheckCircle className={`h-5 w-5 ${selectedService === service.id ? 'text-vet-blue' : 'text-transparent'}`} />
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <Label className="mb-2 block">Choisissez un vétérinaire</Label>
                <RadioGroup value={selectedVet} onValueChange={setSelectedVet} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vets.map((vet) => (
                    <div key={vet.id} className="relative">
                      <RadioGroupItem
                        value={vet.id}
                        id={`vet-${vet.id}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`vet-${vet.id}`}
                        className="flex p-4 border rounded-md cursor-pointer hover:border-vet-blue peer-checked:border-vet-blue peer-checked:bg-vet-blue/5"
                      >
                        <div className="flex-1">
                          <div className="font-medium">{vet.name}</div>
                          <div className="text-sm text-gray-500">{vet.speciality}</div>
                        </div>
                        <CheckCircle className={`h-5 w-5 ${selectedVet === vet.id ? 'text-vet-blue' : 'text-transparent'}`} />
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <div className="mt-4">
                  <Label htmlFor="note" className="mb-2 block">Notes supplémentaires (optionnel)</Label>
                  <Textarea
                    id="note"
                    placeholder="Informations importantes à communiquer au vétérinaire"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-4 text-lg">Récapitulatif du rendez-vous</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Date & Heure</p>
                      <p className="font-medium flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1 text-vet-blue" />
                        {selectedDate && format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })} à {selectedTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Animal</p>
                      <p className="font-medium">
                        {selectedPet && pets.find(pet => pet.id === selectedPet)?.name} ({selectedPet && pets.find(pet => pet.id === selectedPet)?.species})
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Service</p>
                      <p className="font-medium">
                        {selectedService && services.find(service => service.id === selectedService)?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vétérinaire</p>
                      <p className="font-medium">
                        {selectedVet && vets.find(vet => vet.id === selectedVet)?.name}
                      </p>
                    </div>
                    {note && (
                      <div className="col-span-full">
                        <p className="text-sm text-gray-500">Notes</p>
                        <p className="font-medium">{note}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-vet-blue/5 rounded-lg border border-vet-blue/20">
                  <h3 className="font-medium mb-2">Informations importantes</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Veuillez arriver 10 minutes avant votre rendez-vous</li>
                    <li>• N'oubliez pas le carnet de santé de votre animal</li>
                    <li>• En cas d'empêchement, veuillez annuler au moins 24h à l'avance</li>
                  </ul>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Informations de Paiement</h3>
                <Paiement
  selectedDate={selectedDate}
  selectedTime={selectedTime}
  selectedPet={pets.find(pet => pet.id === selectedPet)}
  selectedService={services.find(service => service.id === selectedService)}
  selectedVet={vets.find(vet => vet.id === selectedVet)}
  typePaiement="soin" // ou "store" selon le contexte
/>

              </div>
            )}
          </CardContent>
  
          <CardFooter className="flex justify-between">
  <Button variant="outline" onClick={handlePreviousStep} disabled={step === 1}>
    Précédent
  </Button>
  <Button
    onClick={() => {
      if (step < 5) {
        handleNextStep();
      } else {
        const service = services.find(s => s.id === selectedService);
        const pet = pets.find(p => p.id === selectedPet);
        const vet = vets.find(v => v.id === selectedVet);

        if (!service || !pet || !vet || !selectedDate || !selectedTime) {
          toast({
            title: "Erreur",
            description: "Impossible de générer la facture, certaines données sont manquantes.",
            variant: "destructive"
          });
          return;
        }

        const soin = {
          nom: service.name,
          prix: parseFloat(service.price.replace("€", "")),
          date: format(selectedDate, 'yyyy-MM-dd'),
          heure: selectedTime,
          animal: pet.name,
          veterinaire: vet.name
        };
        
        // ⚠️ Nouvelle ligne : envoyer à Django
        axios.post("http://127.0.0.1:8000/api/rendezvous/", {
          animal: parseInt(pet.id),
          date: format(selectedDate, 'yyyy-MM-dd'),
          heure: selectedTime,
          service: 1,       // ID temporaire (à remplacer par ton ID réel)
          veterinaire: parseInt(vet.id),
          note: note
        }).then(() => {
          navigate("/facture", {
            state: {
              soins: [soin]
            }
          });
        
          toast({
            title: "Paiement effectué",
            description: "Merci pour votre réservation. La facture est disponible."
          });
        }).catch((error) => {
          console.error("Erreur API :", error);
          toast({
            title: "Erreur",
            description: "Échec de la réservation, réessayez.",
            variant: "destructive"
          });
        });
        

        toast({
          title: "Paiement effectué",
          description: "Merci pour votre réservation. La facture est disponible."
        });
      }
    }}
    className="bg-vet-blue hover:bg-vet-blue/90"
  >
    {step < 5 ? 'Suivant' : 'Payer'}
  </Button>
</CardFooter>

        </Card>
      </div>
    </div>
  );
};

          

export default AppointmentBooking; 