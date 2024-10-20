import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './componentes/Navbar';
import Reserva_Cita_Formulario from './pages/Reservar-Cita-Formulario';
import PsychCare from './pages/Atencion-Pisicologica';
import IntervencionCrisis from './pages/Intervencion-en-Crisis';
import Psicoterapia from './pages/Psicoterapia';
import Login from './pages/Login';
import Notas from './pages/Notas';
import Servicios from './pages/Servicios';
import Sider from './componentes/Sider';
import "./Styles/App.css";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="main-layout">
                    <Sider />
                    <div className="content">
                        <Routes>
                            <Route path="/home" element={<Home />} />
                            <Route path="/reserva-cita-formulario" element={<Reserva_Cita_Formulario />} />
                            <Route path="/atencion-psicologica" element={<PsychCare />} />
                            <Route path="/intervencion-crisis" element={<IntervencionCrisis />} />
                            <Route path="/psicoterapia" element={<Psicoterapia />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/notas" element={<Notas />} />
                            <Route path="/servicios" element={<Servicios />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
