import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Heart } from 'lucide-react';
import axios from 'axios';

const Home = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/services/')
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Erreur services:", err));

    axios.get('http://127.0.0.1:8000/api/temoignages/')
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.error("Erreur témoignages:", err));
  }, []);

  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'consultations':
        return <Calendar className="h-12 w-12 text-vet-blue" />;
      case 'chirurgie':
        return <Heart className="h-12 w-12 text-vet-green" />;
      case 'urgences':
        return <Users className="h-12 w-12 text-vet-purple" />;
      default:
        return <Users className="h-12 w-12 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-vet-lightBlue to-vet-lightGreen py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="block">Des Soins Vétérinaires</span>
              <span className="text-vet-blue">Exceptionnels</span>
              <span className="block">Pour Vos Animaux</span>
            </h1>
            <p className="text-gray-700 text-lg mb-8">
              Notre équipe de vétérinaires professionnels s'engage à fournir les meilleurs soins à vos compagnons. Votre animal mérite le meilleur !
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/appointments">
                <Button className="bg-vet-blue hover:bg-vet-blue/90 text-white px-8 py-3 rounded-md">
                  Prendre Rendez-vous
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="px-8 py-3 rounded-md">
                  Nos Services
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80" 
              alt="Veterinary Care" 
              className="rounded-lg shadow-xl max-w-full h-auto lg:max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous offrons une gamme complète de services vétérinaires pour garantir la santé et le bien-être de vos animaux de compagnie.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {getIcon(service.title)}
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">{service.title}</h3>
                <p className="text-gray-600 text-center">{service.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/services">
              <Button variant="outline" className="border-vet-blue text-vet-blue hover:bg-vet-blue hover:text-white">
                Voir Tous Nos Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-vet-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Besoin d'un rendez-vous urgent ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Notre équipe de vétérinaires est disponible pour s'occuper de votre animal dès aujourd'hui.
          </p>
          <Link to="/appointments">
            <Button className="bg-white text-vet-blue hover:bg-gray-100 px-8 py-3 text-lg font-medium rounded-md">
              Réserver Maintenant
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ce Que Disent Nos Clients</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez ce que les propriétaires d'animaux pensent de nos services vétérinaires.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-vet-purple rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">Propriétaire d'un {testimonial.pet}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
