import React from "react";

const TotalTransactions = ({ transactions }) => {
  // Calculer le total des transactions
  const calculateTotal = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === "incomings") {
        return acc + transaction.amount; // Ajouter les revenus
      } else {
        return acc - transaction.amount; // Soustraire les dépenses
      }
    }, 0); // Le total commence à 0
  };

  const total = calculateTotal(transactions);

  return (
    <div className="mb-6 p-4 bg-indigo-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Total des transactions</h2>
      <p className="text-3xl font-bold mt-2">
        {total.toFixed(2)} € {/* Afficher le total avec deux décimales */}
      </p>
    </div>
  );
};

export default TotalTransactions;
