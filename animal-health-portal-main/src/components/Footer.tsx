
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="flex items-center mb-4">
              <img src="/pawprint.svg" alt="PetCare Logo" className="h-10 w-10 bg-white rounded-full p-1" />
              <span className="ml-2 text-2xl font-bold text-white">PetCare</span>
            </div>
            <p className="text-gray-300 mb-4">
              Votre clinique vétérinaire de confiance, offrant des soins de qualité pour vos animaux de compagnie.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-vet-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-vet-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-vet-blue transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 px-4 mb-8">
            <h3 className="text-xl font-semibold mb-4">Liens Utiles</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-vet-blue transition-colors">Accueil</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-vet-blue transition-colors">Nos Services</Link></li>
              <li><Link to="/appointments" className="text-gray-300 hover:text-vet-blue transition-colors">Rendez-vous</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-vet-blue transition-colors">Événements</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-vet-blue transition-colors">Contact</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-vet-blue transition-colors">Inscription</Link></li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/3 px-4 mb-8">
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-vet-blue" />
                <span className="text-gray-300">rue 1 hay soumia,Casablanca</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-vet-blue" />
                <span className="text-gray-300">0662092536</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-vet-blue" />
                <span className="text-gray-300">contact@petcare.com</span>
              </li>
              <li className="flex items-center">
                <Clock size={18} className="mr-2 text-vet-blue" />
                <span className="text-gray-300">Lun-Ven: 8h-18h, Sam: 9h-14h</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} PetCare. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
