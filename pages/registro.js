import React, { useState } from 'react';
import './globals.css'; // Asegúrate de tener este archivo

const Registro = () => {
  const [email, setEmail] = useState('');
  const [rfc, setRfc] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terminos, setTerminos] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!terminos) {
      alert('Debe aceptar los términos y condiciones');
      return;
    }

    alert('Registro enviado');
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h2 className="registro-title">Formulario de Registro</h2>
        <form onSubmit={handleSubmit} className="registro-form">
          <label>Correo electrónico *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>RFC (opcional)</label>
          <input
            type="text"
            value={rfc}
            onChange={(e) => setRfc(e.target.value)}
            pattern="[A-Za-z]{3,4}[0-9]{6}[A-Za-z0-9]{3}"
            title="Formato RFC válido"
          />

          <label>Contraseña *</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirmar Contraseña *</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="registro-checkbox">
            <input
              type="checkbox"
              checked={terminos}
              onChange={() => setTerminos(!terminos)}
              required
            />
            <span>Acepto los <a href="/terminos-condiciones" target="_blank">términos y condiciones</a></span>
          </div>

          <button type="submit" disabled={!terminos}>Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Registro;

