import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(Tooltip, Legend, ArcElement);

const Charts = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/transactions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des transactions");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <p>Chargement des graphiques...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Calculer les totaux pour les graphiques
  const calculateTotals = (transactions) => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      const amount = parseFloat(transaction.amount);
      if (isNaN(amount)) return;

      if (transaction.type === "incomings") {
        totalIncome += amount;
      } else if (transaction.type === "outgo") {
        totalExpense += amount;
      }
    });

    return { totalIncome, totalExpense };
  };

  const { totalIncome, totalExpense } = calculateTotals(transactions);

  // Configurer les données et options pour le graphique
  const data = {
    labels: ["Revenu", "Dépense"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["#4caf50", "#f44336"], // Couleurs pour revenu et dépense
        borderColor: ["#ffffff", "#ffffff"], // Couleur des bordures
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)} €`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Balance entre Revenu et Dépense</h2>
      <div className="h-80"> {/* Ajuster la hauteur du graphique */}
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default Charts;
