import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token de localStorage
    localStorage.removeItem('token');
    
    // Mettre à jour l'état d'authentification
    setIsAuthenticated(false);

    // Rediriger vers la page de login
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="btn btn-primary">
      Déconnexion
    </button>
  );
};

export default LogoutButton;
