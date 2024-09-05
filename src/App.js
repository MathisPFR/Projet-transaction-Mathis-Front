import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginForm from './components/LoginForm';  // Importer le formulaire de login
import Header from './components/Header';
import Homepage from './components/Homepage';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')  // Vérifier si le token est déjà présent
  );

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);  // Marquer l'utilisateur comme authentifié après le login
  };

  return (
    <div className="container mx-auto p-4">
      {!isAuthenticated ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <h1>Bienvenue, vous êtes connecté !</h1>
          <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
          
        </div>
      )}
    </div>
  );
}

export default App;
