import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const NotFound = () => {
  useEffect(() => {
    axios.post('http://127.0.0.1:8000/api/logs-404/', {
      message: "Page non trouvée",
      path: window.location.pathname,
      timestamp: new Date().toISOString(),
    }).catch(err => console.error("Erreur log 404:", err));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <img src="/pawprint.svg" alt="Logo" className="h-12 w-12 opacity-20" />
          <span className="text-6xl font-bold text-gray-300">404</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Page non trouvée</h1>
        <p className="text-gray-600 mb-6">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/">
          <Button className="bg-vet-blue hover:bg-vet-blue/90">Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
