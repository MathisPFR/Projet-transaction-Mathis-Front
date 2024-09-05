import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTransaction = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("incomings");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  // Charger les détails de la transaction existante
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/transactions/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const transaction = response.data;
        setName(transaction.name);
        setDate(transaction.date);
        setType(transaction.type);
        setAmount(transaction.amount);
      } catch (err) {
        setError("Erreur lors du chargement de la transaction");
      }
    };

    fetchTransaction();
  }, [id]);

  // Soumettre les modifications
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.put(
        `http://localhost:8000/api/transactions/${id}`,
        {
          name,
          date,
          type,
          amount: parseFloat(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/transactions");
    } catch (err) {
      setError("Erreur lors de la mise à jour de la transaction");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Modifier la transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="incomings">Revenu</option>
            <option value="outgo">Dépense</option>
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Montant
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTransaction;
