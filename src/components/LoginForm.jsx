import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      // Récupérer le token et stocker dans localStorage
      localStorage.setItem('token', response.data.token);
      
      // Appeler une fonction pour indiquer que l'utilisateur est connecté
      onLoginSuccess();
    } catch (err) {
      setError('Erreur de connexion. Vérifiez vos informations.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-control max-w-xs mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full mb-4"
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full mb-4"
        required
      />
      <button type="submit" className="btn btn-primary w-full">
        Connexion
      </button>
    </form>
  );
};

export default LoginForm;
