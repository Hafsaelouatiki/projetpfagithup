import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  description: string;
  location: string;
  image: string;
  category: 'workshop' | 'vaccination' | 'adoption' | 'checkup';
}

const Events = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [formValues, setFormValues] = useState({
    nom: '',
    email: '',
    telephone: '',
    message: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/inscriptions/', {
        ...formValues,
        event_id: selectedEvent?.id,
      });
      alert('Inscription envoyée avec succès !');
      setFormValues({ nom: '', email: '', telephone: '', message: '' });
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription");
    }
  };

  const events: Event[] = [
    {
      id: 1,
      title: 'Journée portes ouvertes',
      date: new Date(2024, 3, 30),
      time: '10:00 - 17:00',
      description:
        'Découvrez notre clinique vétérinaire et rencontrez notre équipe. Consultations gratuites pour les nouveaux clients.',
      location: 'Clinique PetCare',
      image: 'https://th.bing.com/th/id/OIP.O4VgA8VDwDWt3fNtEdm2wgHaE8?rs=1&pid=ImgDetMain',
      category: 'checkup',
    },
    {
      id: 2,
      title: 'Campagne de vaccination',
      date: new Date(2024, 4, 5),
      time: '09:00 - 16:00',
      description:
        'Campagne de vaccination pour chiens et chats à tarifs préférentiels. Sur rendez-vous uniquement.',
      location: 'Clinique PetCare',
      image:
        'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'vaccination',
    },
    {
      id: 3,
      title: 'Atelier sur la nutrition animale',
      date: new Date(2024, 4, 12),
      time: '14:00 - 16:00',
      description:
        "Apprenez comment améliorer la santé de votre animal par une alimentation adaptée. Conseils personnalisés par nos experts.",
      location: 'Salle de conférence - Clinique PetCare',
      image:
        'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'workshop',
    },
    {
      id: 4,
      title: "Journée d'adoption",
      date: new Date(2024, 4, 20),
      time: '10:00 - 18:00',
      description:
        "En collaboration avec le refuge local, nous organisons une journée spéciale pour l'adoption d'animaux en quête d'un foyer aimant.",
      location: 'Parc municipal',
      image:
        'https://img.freepik.com/vecteurs-libre/conception-affiche-journee-mondiale-adoption_1308-117951.jpg?w=1380&t=st=1663284767~exp=1663285367~hmac=152ff71f4fbe7cd2cb83cebbf3e4960e588bba68fc1c2983283db495fdcdeb1a',
      category: 'adoption',
    },
  ];

  const categories = [
    { value: 'workshop', label: 'Ateliers', color: 'bg-vet-purple' },
    { value: 'vaccination', label: 'Vaccinations', color: 'bg-vet-blue' },
    { value: 'adoption', label: 'Adoptions', color: 'bg-vet-green' },
    { value: 'checkup', label: 'Consultations', color: 'bg-amber-500' },
  ];

  const getCategoryColor = (category: string) => {
    const found = categories.find((c) => c.value === category);
    return found ? found.color : 'bg-gray-500';
  };

  const filteredEvents = events.filter((event) => {
    const dateMatch = !date || format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    const categoryMatch = !selectedCategory || event.category === selectedCategory;
    return dateMatch && categoryMatch;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Événements à Venir</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Découvrez nos événements et activités spéciales pour les propriétaires d'animaux et leurs compagnons.
        </p>
      </div>
  
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="md:w-1/3 lg:w-1/4">
          <div className="sticky top-24">
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h3 className="font-semibold text-lg mb-4">Filtrer par date</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP', { locale: fr }) : "Choisir une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button
                variant="ghost"
                className="mt-2 w-full"
                onClick={() => setDate(undefined)}
              >
                Effacer la date
              </Button>
            </div>
  
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-4">Catégories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div
                    key={category.value}
                    className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                      selectedCategory === category.value ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === category.value ? null : category.value
                      )
                    }
                  >
                    <span className={`w-3 h-3 rounded-full ${category.color} mr-2`}></span>
                    <span>{category.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        <div className="md:w-2/3 lg:w-3/4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <Dialog key={event.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-0 right-0 m-2">
                        <span
                          className={`${getCategoryColor(event.category)} text-white text-xs font-bold px-3 py-1 rounded-full`}
                        >
                          {categories.find(c => c.value === event.category)?.label}
                        </span>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>
                        {format(event.date, 'PPP', { locale: fr })} • {event.time}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm mb-2">{event.description}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-vet-blue hover:bg-vet-blue/90"
                          onClick={() => setSelectedEvent(event)}
                        >
                          S'inscrire
                        </Button>
                      </DialogTrigger>
                    </CardFooter>
                  </Card>
  
                  {selectedEvent && selectedEvent.id === event.id && (
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Inscription à : {selectedEvent.title}</DialogTitle>
                        <DialogDescription>
                          Remplissez le formulaire ci-dessous pour vous inscrire.
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                          <label className="block mb-1 font-medium">Nom complet</label>
                          <Input
                            type="text"
                            name="nom"
                            value={formValues.nom}
                            onChange={handleFormChange}
                            placeholder="Votre nom"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-1 font-medium">Email</label>
                          <Input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleFormChange}
                            placeholder="email@example.com"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-1 font-medium">Téléphone</label>
                          <Input
                            type="tel"
                            name="telephone"
                            value={formValues.telephone}
                            onChange={handleFormChange}
                            placeholder="+212..."
                          />
                        </div>
                        <div>
                          <label className="block mb-1 font-medium">Message</label>
                          <Textarea
                            name="message"
                            value={formValues.message}
                            onChange={handleFormChange}
                            placeholder="Votre message..."
                          />
                        </div>
                        <Button type="submit" className="w-full bg-vet-blue hover:bg-vet-blue/90">
                          Envoyer
                        </Button>
                      </form>
                    </DialogContent>
                  )}
                </Dialog>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <h3 className="text-xl font-medium text-gray-500">
                  Aucun événement ne correspond à vos critères
                </h3>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setDate(undefined);
                    setSelectedCategory(null);
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
   };
  export default Events;
