import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation,
      });

      // Vérifie ce qui est renvoyé par l'API
      console.log('API Response:', response.data);

      // Récupérer le token et stocker dans localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/'); // Rediriger vers la page d'accueil après l'inscription
      } else {
        throw new Error('Token non reçu');
      }
    } catch (err) {
      // Vérifie l'erreur et son contenu
      console.error('Error during registration:', err.response || err.message);
      setError('Erreur de connexion. Vérifiez vos informations.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-control max-w-xs mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}

      <h1 className='title-login'>Inscription</h1>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full mb-4"
        required
      />
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
      <input
        type="password"
        placeholder="Confirmer le mot de passe"
        value={password_confirmation}
        onChange={(e) => setPassword_confirmation(e.target.value)}
        className="input input-bordered w-full mb-4"
        required
      />
      <button type="submit" className="btn btn-primary w-full">
        S'enregistrer
      </button>
    </form>
  );
};

export default Register;
