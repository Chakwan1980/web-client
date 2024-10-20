import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css'; // Asegúrate de crear y usar este archivo CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to ="/home"><button className="nav-btn">Home</button></Link>
        <h1> Lcda. Brenda Flores</h1>
        <Link to="/login">
          <button className="nav-btn">Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

