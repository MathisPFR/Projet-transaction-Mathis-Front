import React, { useState, useEffect } from "react";
import axios from "axios";

const TotalTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // Gérer le chargement
  const [error, setError] = useState(null); // Gérer les erreurs

  // Calculer les totaux des revenus, dépenses et le total net
  const calculateTotals = (transactions) => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      const amount = parseFloat(transaction.amount); // S'assurer que le montant est un nombre
      if (isNaN(amount)) return; // Ignorer si le montant n'est pas un nombre

      if (transaction.type === "incomings") {
        totalIncome += amount; // Ajouter aux revenus
      } else if (transaction.type === "outgo") {
        totalExpense += amount; // Ajouter aux dépenses
      }
    });

    const totalNet = totalIncome - totalExpense; // Calculer le total net
    return { totalIncome, totalExpense, totalNet };
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Appeler l'API pour récupérer les transactions
        const response = await axios.get("http://localhost:8000/api/transactions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ajouter le token dans l'en-tête
          },
        });
        setTransactions(response.data); // Mettre à jour les transactions
        setLoading(false); // Fin du chargement
      } catch (err) {
        setError("Erreur lors de la récupération des transactions");
        setLoading(false); // Fin du chargement malgré l'erreur
      }
    };

    fetchTransactions(); // Appeler la fonction au montage du composant
  }, []);

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const { totalIncome, totalExpense, totalNet } = calculateTotals(transactions); // Calculer les totaux

  return (
    <div className="flex justify-between space-x-4"> {/* Aligner les cartes côte à côte */}
      {/* Carte Revenu */}
      <div className="mb-6 p-4 bg-green-100 rounded-lg shadow-md w-1/3">
        <h2 className="text-lg font-semibold text-green-700">Total Revenu</h2>
        <p className="text-3xl font-bold mt-2 text-green-700">
          {Number.isFinite(totalIncome) ? totalIncome.toFixed(2) : "0.00"} €
        </p>
      </div>

      {/* Carte Dépense */}
      <div className="mb-6 p-4 bg-red-100 rounded-lg shadow-md w-1/3">
        <h2 className="text-lg font-semibold text-red-700">Total Dépense</h2>
        <p className="text-3xl font-bold mt-2 text-red-700">
          {Number.isFinite(totalExpense) ? totalExpense.toFixed(2) : "0.00"} €
        </p>
      </div>

      {/* Carte Total Net */}
      <div className="mb-6 p-4 bg-indigo-100 rounded-lg shadow-md w-1/3">
        <h2 className="text-lg font-semibold">Total Net</h2>
        <p className="text-3xl font-bold mt-2">
          {Number.isFinite(totalNet) ? totalNet.toFixed(2) : "0.00"} €
        </p>
      </div>
    </div>
  );
};

export default TotalTransactions;
