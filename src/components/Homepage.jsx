import React from "react";
import Transactions from "./Transactions";
import { Link } from "react-router-dom";
import TotalTransactions from "./TotalTransactions";
import Charts from "./Charts";

const Homepage = () => {
  return (
    <div>
      <h1>Bienvenue, vous êtes connecté !</h1>
      <TotalTransactions />
      <Link to="/Add-transaction" className="btn btn-primary mb-4">
        Ajouter une transaction
      </Link>

      <div className="flex-container-home">
        <div className="w-2/3">
        <Transactions />

        </div>
        <div className="w-1/3">

        <Charts />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
