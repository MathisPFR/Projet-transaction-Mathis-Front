import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from './LogoutButton';

const Header = ({ setIsAuthenticated }) => {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1 gap-7">
          <Link to="/" className="btn btn-ghost text-xl">
            HOME
          </Link>
          <div className="form-control">
            <div>
              <Link to="/transactions">Liste des transactions</Link>
            </div>
          </div>
          <div className="form-control">
            <div>
              <Link to="/charts">Les graphiques</Link>
            </div>
          </div>
        </div>
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
