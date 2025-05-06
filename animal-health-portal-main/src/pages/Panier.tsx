import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Produit {
  id: number;
  nom: string;
  description: string;
  image: string;
  prix: string;
  stock: boolean;
}

interface PanierProps {
  panier: Produit[];
  total: number;
}

const Panier: React.FC<PanierProps> = ({ panier, total }) => {
  const navigate = useNavigate();

  // Regrouper les produits (évite les doublons visuels)
  const produitsUniques = panier.filter(
    (produit, index, self) =>
      index === self.findIndex((p) => p.id === produit.id)
  );

  const compterProduits = panier.reduce((acc: { [key: number]: number }, produit) => {
    acc[produit.id] = (acc[produit.id] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mon Panier</h1>

      {panier.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produitsUniques.map((produit) => (
              <div key={produit.id} className="border p-4 rounded shadow">
                <img src={produit.image} alt={produit.nom} className="h-40 object-contain mx-auto mb-4" />
                <h2 className="text-lg font-bold">{produit.nom}</h2>
                <p className="text-sm text-gray-500">{produit.description}</p>
                <p className="text-orange-600 font-bold">{produit.prix}</p>
                <p className="text-sm text-gray-700">Quantité : {compterProduits[produit.id]}</p>
              </div>
            ))}
          </div>

          <div className="text-right mt-8 text-xl font-bold">
            Total : {total.toFixed(2)} MAD
          </div>

          {/* 💳 Formulaire de paiement */}
          <div className="mt-10 border-t pt-6">
            <h3 className="text-xl font-bold mb-4">💳 Paiement par carte bancaire</h3>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.post("http://127.0.0.1:8000/api/achats/", {
                    achats: panier,
                    total: total
                  });
                  navigate("/facture", { state: { panier, total } });
                } catch (err) {
                  console.error("Erreur lors de l'envoi du panier :", err);
                }
              }}
              className="grid gap-4"
            >
              <div>
                <label className="block font-medium mb-1">Titulaire de la carte</label>
                <input
                  type="text"
                  required
                  className="w-full border px-4 py-2 rounded"
                  placeholder="Nom complet"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Numéro de carte</label>
                <input
                  type="text"
                  required
                  maxLength={16}
                  className="w-full border px-4 py-2 rounded"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-medium mb-1">Date d’expiration</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/AA"
                    className="w-full border px-4 py-2 rounded"
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-1">CVV</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    className="w-full border px-4 py-2 rounded"
                    placeholder="123"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                💰 Payer maintenant
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Panier;