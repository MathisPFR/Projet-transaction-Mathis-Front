import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginForm from './components/LoginForm';  // Importer le formulaire de login
import Header from './components/Header';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Transactions from './components/Transactions';
import Charts from './components/Charts';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Mettre à jour l'état d'authentification lorsque le token change
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        {isAuthenticated ? (
          <div>
            <Header setIsAuthenticated={setIsAuthenticated} />  {/* Passer setIsAuthenticated au header */}
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/charts" element={<Charts />} />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
            <Route path="*" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
