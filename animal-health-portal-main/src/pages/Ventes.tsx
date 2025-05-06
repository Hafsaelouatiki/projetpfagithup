import React from 'react';
import axios from 'axios';

// Type d'un produit
interface Produit {
  id: number;
  nom: string;
  description: string;
  image: string;
  prix: string;
  stock: boolean;
}

interface VentesProps {
  panier: Produit[];
  setPanier: React.Dispatch<React.SetStateAction<Produit[]>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}

const Ventes: React.FC<VentesProps> = ({ panier, setPanier, total, setTotal }) => {
  const produits: Produit[] = [
    {
      id: 1,
      nom: 'EQUILIBRIO - Small adult 2 kg',
      description: 'Les croquettes Equilibrio pour petits chiens adultes.',
      image: 'https://nuspet.pe/wp-content/uploads/2024/03/equilibrio-adulto-small-morado-2-kg.jpg',
      prix: '145,00 MAD',
      stock: true,
    },
    {
      id: 2,
      nom: 'EQUILIBRIO - Skin & Digestion',
      description: 'Pour chiens sensibles : peau et digestion.',
      image: 'https://www.zooarea.gr/image/cache/catalog/skylos/ksira-trofi/earthborn/equilibrio-skin-digestion-salmon-2kg-500x500.jpg',
      prix: '690,00 MAD',
      stock: true,
    },
    {
      id: 3,
      nom: 'Os au Lait et Miel pour Chien',
      description: 'Offrez un plaisir sucré à votre chien.',
      image: 'https://th.bing.com/th/id/OIP.u3-xKve01TE6RlEjn3Tc_gAAAA?rs=1&pid=ImgDetMain',
      prix: '70,00 MAD',
      stock: true,
    },
    {
      id: 4,
      nom: 'MHIMS BEEF & VEGS - 375 G',
      description: 'Aliment naturel pour chien adulte.',
      image: 'https://donfarma.com/31012-thickbox_default/mhims-beef-vegs-375g-dingo-natura.jpg',
      prix: '35,00 MAD',
      stock: true,
    },
    {
      id: 5,
      nom: "Trio d'Os de Fibules",
      description: 'Un plaisir de mastication intense.',
      image: 'https://th.bing.com/th/id/OIP.ybnPm1SD4ytzwj_HCT-gIQAAAA?rs=1&pid=ImgDetMain',
      prix: '30,00 MAD',
      stock: true,
    },
    {
      id: 6,
      nom: 'Huile de saumon OptiBiomega',
      description: 'Complément naturel riche en oméga.',
      image: 'https://productimages.hepsiburada.net/s/373/550/110000391158491.jpg',
      prix: '140,00 MAD',
      stock: true,
    },
    {
      id: 7,
      nom: 'Harnais Y en maille avec laisse',
      description: 'Le Harnais Y en maille avec laisse élastique pour chat Trixie 39-60cm/10mm, 1,00m',
      image: 'https://media.zooplus.com/bilder/7/800/203970_trixie_mesh_ygeschirr_elastischerleine_hs_05_7.jpg',
      prix: '150,00 MAD',
      stock: true,
    },
    {
      id: 8,
      nom: 'Pack de 4*100G pochons chat with fish',
      description: 'Offrez à votre chat un festin irrésistible avec ce pack de 4 pochons de 100g chacun',
      image: 'https://th.bing.com/th/id/OIP.V485PfnxtjWxdcAODYUf2AHaHa?rs=1&pid=ImgDetMain',
      prix: '190,00 MAD',
      stock: true,
    },
    {
      id: 9,
      nom: 'Vi̇tali̇cat Paste - Multivitamins pour chat',
      description: 'Offrez à votre chat un concentré de vitalité avec Vitalicat Paste',
      image: 'https://th.bing.com/th/id/R.e1c7b7b113b33bebcad27d00b74782af?rik=VxA%2fiM5MOm8eHw&riu=http%3a%2f%2fbahrain-pets.com%2fcdn%2fshop%2fproducts%2fAmbalaj_BPA_VitaliCAT_Tube_100ml-ZZ_1200x1200.png%3fv%3d1617097361&ehk=VMu%2fAk1%2fiM16f%2fbgF4A3GEMRclAgQczWl0YUa7S2Ids%3d&risl=&pid=ImgRaw&r=0',
      prix: '100,00 MAD',
      stock: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-vet-blue mb-6">
        Vente d'Aliments & Accessoires
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Découvrez nos produits sélectionnés pour le bien-être de vos animaux.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produits.map((produit) => (
          <div
            key={produit.id}
            className="bg-white rounded-lg shadow p-4 relative hover:shadow-lg transition"
          >
            {!produit.stock && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                RUPTURE DE STOCK
              </div>
            )}
            <img
              src={produit.image}
              alt={produit.nom}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-md font-bold text-gray-800">{produit.nom}</h3>
            <p className="text-sm text-gray-500 mb-2">{produit.description}</p>
            <p className="text-orange-600 font-bold mb-4">{produit.prix}</p>
            <button
              className={`w-full px-4 py-2 rounded ${produit.stock ? 'bg-vet-blue text-white hover:bg-vet-blue/90' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
              disabled={!produit.stock}
              onClick={() => {
                setPanier([...panier, produit]);
                const prixNum = parseFloat(produit.prix.replace(',', '.').replace(' MAD', ''));
                setTotal(total + prixNum);

                axios.post('http://127.0.0.1:8000/api/ventes/', {
                  produit: produit.nom,
                  prix: prixNum,
                  quantite: 1
                }).catch(err => {
                  console.error("Erreur lors de l'enregistrement de la vente :", err);
                });
              }}
            >
              {produit.stock ? 'Commander' : 'Indisponible'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ventes;