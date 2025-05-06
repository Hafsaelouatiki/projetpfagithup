import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = ({ panier }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-10 w-10"
                src="/pawprint.svg"
                alt="Vet Clinic Logo"
              />
              <span className="ml-2 text-xl font-bold logo-text">PetCare</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-vet-blue px-3 py-2 rounded-md text-sm font-medium">Accueil</Link>
              <Link to="/ventes" className="text-gray-700 hover:text-vet-blue px-3 py-2 rounded-md text-sm font-medium">Vente d'Aliments & Accessoires</Link>
              <Link to="/services" className="text-gray-700 hover:text-vet-blue px-3 py-2 rounded-md text-sm font-medium">Services</Link>
              <Link to="/appointments" className="text-gray-700 hover:text-vet-blue px-3 py-2 rounded-md text-sm font-medium">Rendez-vous</Link>
              <Link to="/events" className="text-gray-700 hover:text-vet-blue px-3 py-2 rounded-md text-sm font-medium">Événements</Link>
              <Link to="/contact" className="text-gray-700 hover:text-vet-blue px-3 py-2 rounded-md text-sm font-medium">Contact</Link>

              <Link to="/login">
                <Button variant="outline" className="ml-4">Connexion</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-vet-blue hover:bg-vet-blue/90">Inscription</Button>
              </Link>

              {/* ✅ Correction : rediriger vers /panier */}
              <Link
                to="/panier"
                className="flex items-center bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200"
              >
                <span className="mr-1 font-medium">🛒 Panier</span>
                <span className="text-sm font-semibold">{panier.length}</span>
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-vet-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-vet-blue"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Menu Mobile */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-vet-blue hover:bg-gray-100">Accueil</Link>
            <Link to="/ventes" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-vet-blue hover:bg-gray-100">Vente d'Aliments & Accessoires</Link>
            <Link to="/services" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-vet-blue hover:bg-gray-100">Services</Link>
            <Link to="/appointments" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-vet-blue hover:bg-gray-100">Rendez-vous</Link>
            <Link to="/events" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-vet-blue hover:bg-gray-100">Événements</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-vet-blue hover:bg-gray-100">Contact</Link>
            <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-vet-blue hover:bg-gray-100">Connexion</Link>
            <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-vet-blue hover:bg-gray-100">Inscription</Link>
            {/* ✅ Correction ici aussi */}
            <Link to="/panier" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium bg-gray-100 text-gray-700 hover:text-vet-blue hover:bg-gray-200">
              🛒 Panier ({panier.length})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
