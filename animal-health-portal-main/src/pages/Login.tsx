import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });

      setIsLoading(false);

      const user = response.data;

      if (user && user.role) {
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${user.nom || 'utilisateur'}`,
        });

        switch (user.role) {
          case "patient":
            navigate('/patient');
            break;
          case "veterinaire":
            navigate('/veterinaire', { state: { specialite: user.specialite, nom: user.nom } });
            break;
          case "admin":
            navigate('/admin');
            break;
          default:
            toast({
              title: "Erreur",
              description: "Rôle utilisateur non reconnu",
              variant: "destructive"
            });
        }
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Identifiants incorrects ou utilisateur introuvable",
          variant: "destructive"
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Erreur serveur",
        description: "Impossible de se connecter au serveur.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
          <CardDescription>Entrez vos identifiants</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="nom@exemple.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center">
            Pas encore de compte? <Link to="/register" className="text-blue-500">S'inscrire</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
