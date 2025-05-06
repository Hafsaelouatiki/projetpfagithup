import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, Home, User, Bell } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    clients: 0,
    rendezvous: 0,
    personnel: 0,
    salles: 3
  });

  const [staffMembers, setStaffMembers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resClients, resRDV, resPersonnel] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/clients/"),
          axios.get("http://127.0.0.1:8000/api/rendezvous/"),
          axios.get("http://127.0.0.1:8000/api/veterinaires/")
        ]);

        setStats({
          clients: resClients.data.length,
          rendezvous: resRDV.data.length,
          personnel: resPersonnel.data.length,
          salles: 3
        });
      } catch (error) {
        console.error("Erreur chargement stats :", error);
      }
    };

    const fetchStaff = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/personnel/");
        setStaffMembers(res.data);
      } catch (error) {
        console.error("Erreur chargement personnel :", error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/notifications/");
        setNotifications(res.data);
      } catch (error) {
        console.error("Erreur chargement notifications :", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/stats/appointments/");
        setAppointmentData(res.data);
      } catch (error) {
        console.error("Erreur chargement rendez-vous :", error);
      }
    };

    const fetchRevenues = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/stats/revenues/");
        setRevenueData(res.data);
      } catch (error) {
        console.error("Erreur chargement revenus :", error);
      }
    };

    fetchStats();
    fetchStaff();
    fetchNotifications();
    fetchAppointments();
    fetchRevenues();
  }, []);

  const notificationStyles = {
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-amber-50 border-amber-200',
    success: 'bg-green-50 border-green-200',
  };

  const notificationIcons = {
    info: <Bell className="h-5 w-5 text-blue-500" />,
    warning: <Bell className="h-5 w-5 text-amber-500" />,
    success: <Bell className="h-5 w-5 text-green-500" />,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Administration</h1>
          <p className="text-gray-600">Gérez votre clinique vétérinaire</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Button variant="outline">
            Rapports
          </Button>
          <Button className="bg-vet-blue">
            Paramètres
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center pt-6">
            <div className="bg-vet-blue/10 p-3 rounded-full mb-4">
              <Users className="h-6 w-6 text-vet-blue" />
            </div>
            <h3 className="text-xl font-bold">{stats.clients}</h3>
            <p className="text-sm text-gray-500">Clients enregistrés</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center pt-6">
            <div className="bg-vet-green/10 p-3 rounded-full mb-4">
              <Calendar className="h-6 w-6 text-vet-green" />
            </div>
            <h3 className="text-xl font-bold">{stats.clients}</h3>
            <p className="text-sm text-gray-500">Rendez-vous aujourd'hui</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center pt-6">
            <div className="bg-vet-purple/10 p-3 rounded-full mb-4">
              <User className="h-6 w-6 text-vet-purple" />
            </div>
            <h3 className="text-xl font-bold">{stats.clients}</h3>
            <p className="text-sm text-gray-500">Personnel actif</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center pt-6">
            <div className="bg-amber-500/10 p-3 rounded-full mb-4">
              <Home className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold">{stats.clients}</h3>
            <p className="text-sm text-gray-500">Salles disponibles</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="staff">Personnel</TabsTrigger>
          <TabsTrigger value="inventory">Inventaire</TabsTrigger>
          <TabsTrigger value="financial">Finances</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Rendez-vous (6 derniers mois)</CardTitle>
                  <CardDescription>Répartition par type de service</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={appointmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="consultations" stroke="#4A96DA" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="surgeries" stroke="#50C878" />
                      <Line type="monotone" dataKey="vaccinations" stroke="#9b87f5" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-3 rounded-lg border ${notificationStyles[notification.type as keyof typeof notificationStyles]}`}
                      >
                        <div className="flex items-start">
                          <div className="mr-3">
                            {notificationIcons[notification.type as keyof typeof notificationIcons]}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{notification.message}</p>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Gestion des créneaux
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Nouveau membre du personnel
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="mr-2 h-4 w-4" />
                      Envoyer une notification
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="staff">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Gestion du Personnel</CardTitle>
                <CardDescription>Membres de l'équipe vétérinaire</CardDescription>
              </div>
              <Button className="mt-4 md:mt-0">
                Ajouter un membre
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row mb-6 gap-4">
                <div className="flex-1">
                  <Input placeholder="Rechercher un membre..." />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filtrer par rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les rôles</SelectItem>
                    <SelectItem value="veterinarian">Vétérinaires</SelectItem>
                    <SelectItem value="assistant">Assistants</SelectItem>
                    <SelectItem value="receptionist">Réceptionnistes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spécialisation</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {staffMembers.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{member.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.specialization || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            member.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {member.status === 'active' ? 'Actif' : 'En congé'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button size="sm" variant="ghost" className="text-vet-blue hover:text-vet-blue/80">
                            Modifier
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Gestion de l'inventaire</CardTitle>
              <CardDescription>Médicaments et fournitures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-500">Module d'inventaire en cours de développement</h3>
                <p className="text-gray-400 mt-2">Cette fonctionnalité sera disponible prochainement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financial">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Revenus (6 derniers mois)</CardTitle>
              <CardDescription>Aperçu financier de la clinique</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} €`, 'Revenus']} />
                  <Bar dataKey="revenue" fill="#4A96DA" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des revenus</CardTitle>
                <CardDescription>Par type de service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-vet-blue mr-2"></div>
                      <span>Consultations</span>
                    </div>
                    <div>
                      <span className="font-medium">42%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-vet-green mr-2"></div>
                      <span>Chirurgies</span>
                    </div>
                    <div>
                      <span className="font-medium">28%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-vet-purple mr-2"></div>
                      <span>Vaccinations</span>
                    </div>
                    <div>
                      <span className="font-medium">18%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <span>Vente de produits</span>
                    </div>
                    <div>
                      <span className="font-medium">12%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Rapports financiers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Rapport mensuel (Avril 2024)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Rapport trimestriel (Q1 2024)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Factures en attente
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Exporter les données financières
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;