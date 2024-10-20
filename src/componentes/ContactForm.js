import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [showStatus, setShowStatus] = useState(false); // Nuevo estado

    const handleSubmit = async (e) => { /* manejar el envio*/
        e.preventDefault(); /* prevenir el incumplimiento*/

        try {
            await axios.post('http://localhost:3000/contacto', {
                name,
                telefono,
                email,
                message
            });
            setStatus('Mensaje enviado con éxito');
            setShowStatus(true); // Muestra el mensaje de estado

            // Restablece los campos del formulario después de 1 segundo
            setTimeout(() => {
                setName('');
                setTelefono('');
                setEmail('');
                setMessage('');
                setShowStatus(false); // Oculta el mensaje de estado después de 2 segundos
            }, 2000); // 2 segundos, ajusta según sea necesario
        } catch (error) {
            console.error(error); // Para depuración
            setStatus('Error al enviar el mensaje');
            setShowStatus(true); // Muestra el mensaje de estado en caso de error

            // Restablece los campos del formulario después de 2 segundos
            setTimeout(() => {
                setShowStatus(false); // Oculta el mensaje de estado después de 2 segundos
            }, 2000); // 2 segundos, ajusta según sea necesario
        }
    };

    return (
        <div className="contact-form">
            <h2>Contacto</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Teléfono:
                    <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Mensaje:
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                </label>
                <button type="submit">Enviar</button>
            </form>
            {showStatus && <p>{status}</p>}
        </div>
    );
};

export default ContactForm;


