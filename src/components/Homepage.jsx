import React from "react";
import Transactions from "./Transactions";
import { Link } from "react-router-dom";
import TotalTransactions from "./TotalTransactions";

const Homepage = () => {
  return (
    <div>
      <h1>Bienvenue, vous êtes connecté !</h1>
      <br />
      <Link to="/Add-transaction" className="btn btn-primary mb-4">
        Ajouter une transaction
      </Link>



      <Transactions />
    </div>
  );
};

export default Homepage;
