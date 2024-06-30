import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="navbar">
      <h1>Compiler Dashboard</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/compiler">Compiler</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
