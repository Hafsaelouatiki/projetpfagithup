import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CheckSquare, Clock, PlusCircle, Calendar as CalendarIcon } from 'lucide-react';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/rendezvous/')
      .then((res) => setAppointments(res.data))
      .catch(() => setAppointments([]));

    axios.get('http://127.0.0.1:8000/api/animaux/')
      .then((res) => setPets(res.data))
      .catch(() => setPets([]));

    axios.get('http://127.0.0.1:8000/api/historiques/')
      .then((res) => setMedicalHistory(res.data))
      .catch(() => setMedicalHistory([]));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Bienvenue, Jean Dupont</h1>
          <p className="text-gray-600">Accédez à votre espace personnel</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-vet-green">
          <PlusCircle className="mr-2 h-4 w-4" /> Nouveau Rendez-vous
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center pt-6">
            <div className="bg-vet-blue/10 p-3 rounded-full mb-4">
              <Calendar className="h-6 w-6 text-vet-blue" />
            </div>
            <h3 className="text-xl font-bold">{appointments.length}</h3>
            <p className="text-sm text-gray-500">Rendez-vous à venir</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center pt-6">
            <div className="bg-vet-green/10 p-3 rounded-full mb-4">
              <CheckSquare className="h-6 w-6 text-vet-green" />
            </div>
            <h3 className="text-xl font-bold">{pets.length}</h3>
            <p className="text-sm text-gray-500">Animaux enregistrés</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center pt-6">
            <div className="bg-vet-purple/10 p-3 rounded-full mb-4">
              <Clock className="h-6 w-6 text-vet-purple" />
            </div>
            <h3 className="text-xl font-bold">{medicalHistory.length}</h3>
            <p className="text-sm text-gray-500">Visites précédentes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center pt-6">
            <div className="bg-amber-500/10 p-3 rounded-full mb-4">
              <CalendarIcon className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold">4</h3>
            <p className="text-sm text-gray-500">Événements à venir</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="appointments" className="w-full" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
          <TabsTrigger value="pets">Mes Animaux</TabsTrigger>
          <TabsTrigger value="medical">Historique Médical</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appointments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Rendez-vous Programmés</h2>
            <Button variant="outline">Voir tout</Button>
          </div>
          
          {appointments.map((appointment: any) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-semibold">{appointment.type} - {appointment.petName}</h3>
                    <p className="text-sm text-gray-600">{appointment.date} à {appointment.time}</p>
                    <p className="text-sm text-gray-600">Avec {appointment.doctor}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Modifier</Button>
                    <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">Annuler</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="pets" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Mes Animaux</h2>
            <Button>Ajouter un animal</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pets.map((pet: any) => (
              <Card key={pet.id}>
                <CardHeader>
                  <CardTitle className="text-xl">{pet.name}</CardTitle>
                  <CardDescription>{pet.species} - {pet.breed}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Âge:</span>
                      <span>{pet.age} ans</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Dernière visite:</span>
                      <span>{pet.lastVisit}</span>
                    </div>
                    <div className="pt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        Voir Détails
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="medical" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Historique Médical</h2>
            <Button variant="outline">Imprimer</Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Animal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vétérinaire</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {medicalHistory.map((record: any) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.petName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.doctor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{record.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDashboard;
