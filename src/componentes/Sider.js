import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Sider.css'; // Asegúrate de tener este archivo CSS

const Sider = () => {
  return (
    <div className="container">
      <aside className="sidebar">
        <Link to="/reserva-cita-formulario">
          <button className="sidebar-btn">Reserva Cita</button>
        </Link>
        <Link to="/servicios">
          <button className="sidebar-btn">
      Servicios
          </button>
        </Link>
        <Link to="/atencion-psicologica">
          <button className="sidebar-btn">Atencion Psicologica</button>
        </Link>
        <Link to="/psicoterapia">
          <button className="sidebar-btn">Psicoterapia</button>
        </Link>
        <Link to="/intervencion-crisis">
          <button className="sidebar-btn">Intervencion en Crisis</button>
        </Link>
        <Link to="/">
          <button className="sidebar-btn">Botón 2</button>
        </Link>
      </aside>
    </div>
  );
};

export default Sider;
