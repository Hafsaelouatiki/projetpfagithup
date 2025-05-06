import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        Nos Services Vétérinaires
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
        Bienvenue dans notre cabinet vétérinaire spécialisé dans les soins pour vos animaux au Maroc. Découvrez nos services ci-dessous.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Consultations Générales</h2>
          <p className="text-gray-700">Suivi médical, diagnostic et traitement de vos animaux de compagnie.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Vaccinations</h2>
          <p className="text-gray-700">Programmes de vaccination pour chiens, chats et animaux exotiques.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Analyses Médicales</h2>
          <p className="text-gray-700">Analyses sanguines, urinaires et autres examens de laboratoire vétérinaire.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Chirurgie Vétérinaire</h2>
          <p className="text-gray-700">Stérilisation, opérations courantes et soins post-chirurgicaux.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Toilettage</h2>
          <p className="text-gray-700">Toilettage professionnel pour chiens et chats.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Vente d'Aliments & Accessoires</h2>
          <p className="text-gray-700">Produits vétérinaires, accessoires, jouets et alimentation spécialisée.</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center mt-12 gap-4">
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Accueil
        </Link>
        <Link to="/appointments" className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Prendre Rendez-vous
        </Link>
        <Link to="/events" className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
          Nos Événements
        </Link>
        
      </div>
    </div>
  );
};

export default Services;
