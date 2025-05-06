import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Paiement = ({
  selectedDate,
  selectedTime,
  selectedPet,
  selectedService,
  selectedVet,
  typePaiement = 'store',
  panier = [],
  total = 0,
}) => {
  const [mode, setMode] = useState('carte');
  const navigate = useNavigate();

  const handlePaiement = () => {
    if (typePaiement === 'soin') {
      const soin = {
        nom: selectedService?.name,
        prix: parseFloat(selectedService?.price.replace("€", "")),
        date: selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '',
        heure: selectedTime,
        animal: selectedPet?.name,
        veterinaire: selectedVet?.name,
      };

      axios.post('http://127.0.0.1:8000/api/soins/', soin)
        .then(() => {
          navigate('/facture', {
            state: {
              soins: [soin],
            },
          });
        })
        .catch((err) => {
          console.error("Erreur lors de l'envoi du soin :", err);
        });
    } else {
      const achatData = {
        achats: panier,
        total: total,
      };

      axios.post('http://127.0.0.1:8000/api/achats/', achatData)
        .then(() => {
          navigate('/facture', {
            state: {
              achats: panier,
              total,
            },
          });
        })
        .catch((err) => {
          console.error("Erreur lors de l'envoi des achats :", err);
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">💳 Paiement</h1>

      {typePaiement === 'soin' && selectedDate && selectedTime && selectedPet && selectedService && selectedVet ? (
        <>
          <div className="space-y-1 text-sm mb-6">
            <p><strong>Date :</strong> {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })} à {selectedTime}</p>
            <p><strong>Animal :</strong> {selectedPet.name} ({selectedPet.species})</p>
            <p><strong>Service :</strong> {selectedService.name} - {selectedService.price}</p>
            <p><strong>Vétérinaire :</strong> {selectedVet.name}</p>
          </div>

          <Label className="block mb-2">Mode de paiement :</Label>
          <RadioGroup value={mode} onValueChange={setMode} className="flex gap-4 mb-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem id="carte" value="carte" />
              <Label htmlFor="carte">Carte bancaire</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="cabinet" value="cabinet" />
              <Label htmlFor="cabinet">Paiement à la clinique</Label>
            </div>
          </RadioGroup>
        </>
      ) : typePaiement === 'store' ? (
        <>
          <h2 className="text-xl font-semibold mb-4">🛒 Produits commandés</h2>
          <ul className="mb-6 border rounded p-4 bg-gray-50">
            {panier.map((produit, index) => (
              <li key={index} className="text-sm py-1 border-b">
                {produit.nom} — {produit.prix}
              </li>
            ))}
          </ul>
          <p className="text-right text-lg font-bold mb-6">
            Total : {total.toFixed(2)} MAD
          </p>
        </>
      ) : (
        <p className="text-center text-gray-500">Aucune donnée de paiement disponible.</p>
      )}

      {(typePaiement === 'store' || mode === 'carte') && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
          <div>
            <Label>Nom sur la carte</Label>
            <Input type="text" placeholder="Nom complet" />
          </div>
          <div>
            <Label>Numéro de carte</Label>
            <Input type="text" placeholder="XXXX XXXX XXXX XXXX" maxLength={19} />
          </div>
          <div>
            <Label>Date d'expiration</Label>
            <Input type="text" placeholder="MM/AA" maxLength={5} />
          </div>
          <div>
            <Label>CVV</Label>
            <Input type="password" placeholder="123" maxLength={3} />
          </div>
        </div>
      )}

      {typePaiement === 'soin' && mode === 'cabinet' && (
        <p className="text-green-600 font-medium mb-6">
          Vous avez choisi de payer à la clinique. Aucun paiement en ligne requis.
        </p>
      )}

      <div className="text-center">
        <button
          onClick={handlePaiement}
          className="bg-vet-blue text-white px-6 py-2 rounded hover:bg-vet-blue/90 transition"
        >
          Confirmer le paiement
        </button>
      </div>
    </div>
  );
};

export default Paiement;
