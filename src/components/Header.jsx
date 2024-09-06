import React from "react";
import { Link, useLocation } from "react-router-dom"; // Importer useLocation
import LogoutButton from './LogoutButton';

const Header = ({ setIsAuthenticated }) => {
  const location = useLocation(); // Utiliser useLocation pour savoir où l'on est

  // Vérifier si le chemin est actif et appliquer les classes de style correspondantes
  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1 gap-7">
          {/* Logo */}
          <Link to="/" className="btn btn-ghost text-xl">
            <img src="/logo-app.png" alt="Logo" className="w-12 h-12" />
          </Link>
          
          {/* Lien Transactions */}
          <div className="form-control">
            <div>
              <Link
                to="/transactions"
                className={`btn btn-ghost ${isActive('/transactions') ? 'bg-blue-500 text-white' : ''}`}  // Appliquer le style actif
              >
                Liste des transactions
              </Link>
            </div>
          </div>

          {/* Lien Graphiques */}
          <div className="form-control">
            <div>
              <Link
                to="/charts"
                className={`btn btn-ghost ${isActive('/charts') ? 'bg-blue-500 text-white' : ''}`}  // Appliquer le style actif
              >
                Les graphiques
              </Link>
            </div>
          </div>
        </div>
        
        {/* Dropdown Avatar */}
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <LogoutButton setIsAuthenticated={setIsAuthenticated} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
