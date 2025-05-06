import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Facture = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const soins = location.state?.soins || [];
  const panier = location.state?.panier || [];
  const totalPanier = location.state?.total || 0;

  const numeroCommande = Math.floor(Math.random() * 1000000);
  const totalSoins = soins.reduce((acc, item) => acc + parseFloat(item.prix), 0);
  const aucunServiceEtPanier = soins.length === 0 && panier.length === 0;

  const envoyerFacture = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/factures/", {
        numero_commande: numeroCommande,
        soins: soins,
        panier: panier,
        total: totalSoins + totalPanier,
      });
      alert("Facture enregistrée avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la facture :", error);
      alert("Échec de l'enregistrement de la facture.");
    }
  };

  if (aucunServiceEtPanier) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-red-500 mb-4">Aucun élément à facturer.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retour à l’accueil
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center">🧾 Facture complète</h2>

      <div className="bg-white shadow p-6 rounded mb-6">
        <p className="text-gray-600 mb-2">Merci pour votre commande et/ou soins !</p>
        <p className="font-semibold">Numéro de facture : #{numeroCommande}</p>
        <p className="text-green-600 font-medium">✔ Paiement confirmé</p>
      </div>

      {/* Détails des soins */}
      {soins.map((soin, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded shadow mb-6">
          <h3 className="text-xl font-bold mb-4">🩺 Détail du soin</h3>
          <table className="w-full text-left border-t border-b border-gray-200 mb-4">
            <tbody>
              <tr><td className="py-2 font-medium w-1/3">Service</td><td className="py-2">{soin.nom}</td></tr>
              <tr><td className="py-2 font-medium">Prix</td><td className="py-2">{parseFloat(soin.prix).toFixed(2)} MAD</td></tr>
              <tr><td className="py-2 font-medium">Animal</td><td className="py-2">{soin.animal}</td></tr>
              <tr><td className="py-2 font-medium">Vétérinaire</td><td className="py-2">{soin.veterinaire}</td></tr>
              <tr><td className="py-2 font-medium">Date</td><td className="py-2">{soin.date}</td></tr>
              <tr><td className="py-2 font-medium">Heure</td><td className="py-2">{soin.heure}</td></tr>
            </tbody>
          </table>
        </div>
      ))}

      {/* Détails du panier */}
      {panier.length > 0 && (
        <div className="bg-gray-50 p-4 rounded shadow mb-6">
          <h3 className="text-xl font-bold mb-4">🛍️ Détails des produits</h3>
          {panier.map((produit, index) => (
            <div key={index} className="mb-2 border-b pb-2">
              <p><strong>Produit :</strong> {produit.nom}</p>
              <p><strong>Prix :</strong> {produit.prix}</p>
            </div>
          ))}
        </div>
      )}

      <div className="text-right text-2xl font-bold mt-4">
        ✅ Total TTC : {(totalSoins + totalPanier).toFixed(2)} MAD
      </div>

      <div className="text-center mt-6">
        <button
          onClick={envoyerFacture}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          💾 Enregistrer la facture
        </button>
      </div>

      <div className="text-center mt-8 space-x-4">
        <button
          onClick={() => navigate("/ventes")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          🛒 Retour à la vente
        </button>
        <button
          onClick={() => navigate("/services")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          🩺 Retour aux services
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          🏠 Accueil
        </button>
      </div>
    </div>
  );
};

export default Facture;
