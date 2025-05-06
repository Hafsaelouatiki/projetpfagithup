import { useEffect, useState } from "react";
import axios from "axios";
const [rendezvous, setRendezvous] = useState([]);

interface RendezVous {
  id: number;
  animal: string;
  proprietaire: string;
  date: string;
  heure: string;
  specialite: string;
}

const VeterinarianDashboard: React.FC = () => {
  const [specialiteChoisie, setSpecialiteChoisie] = useState('');
  const [rendezVous, setRendezVous] = useState<RendezVous[]>([]);

  const specialites = ["Vaccination", "Dermatologie", "Général", "Ophtalmologie"];

  

  useEffect(() => {
    if (specialiteChoisie) {
      axios
        .get(`http://127.0.0.1:8000/api/rendezvous/?specialite=${specialiteChoisie}`)
        .then((res) => setRendezVous(res.data))
        .catch((err) => console.error("Erreur API :", err));
    } else {
      setRendezVous([]);
    }
  }, [specialiteChoisie]);
  
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord Vétérinaire</h1>

      <div className="mb-4">
        <label className="font-semibold text-lg">Choisissez votre spécialité :</label>
        <select
          className="border p-2 rounded ml-2"
          value={specialiteChoisie}
          onChange={(e) => setSpecialiteChoisie(e.target.value)}
        >
          <option value="">-- Sélectionnez une spécialité --</option>
          {specialites.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {specialiteChoisie && (
        <>
          <h2 className="text-xl font-semibold mb-4">Rendez-vous pour : {specialiteChoisie}</h2>
          {rendezVous.length ? (
            rendezVous.map(rv => (
              <div key={rv.id} className="border p-4 rounded shadow-sm mb-3">
                <p><strong>Date :</strong> {rv.date}</p>
                <p><strong>Heure :</strong> {rv.heure}</p>
                <p><strong>Animal :</strong> {rv.animal}</p>
                <p><strong>Propriétaire :</strong> {rv.proprietaire}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Aucun rendez-vous prévu pour cette spécialité.</p>
          )}
        </>
      )}
    </div>
  );
};

export default VeterinarianDashboard;
