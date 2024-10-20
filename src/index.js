import React from 'react';
import { createRoot } from 'react-dom/client'; // Cambiado de 'react-dom' a 'react-dom/client'
import App from './App';
import './index.css'; // Si tienes estilos globales

const root = createRoot(document.getElementById('root')); // Crea un root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
