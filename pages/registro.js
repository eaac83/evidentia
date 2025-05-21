import React, { useState, useEffect } from 'react';

const Registro = () => {
  const [email, setEmail] = useState('');
  const [rfc, setRfc] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terminos, setTerminos] = useState(false);

  useEffect(() => {
    // Evitar clic derecho
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener('contextmenu', disableRightClick);
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (!terminos) {
      alert('Debes aceptar los términos y condiciones.');
      return;
    }

    alert('¡Registro enviado!');
    // Aquí puedes agregar la lógica para enviar los datos al backend
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
            <label className="registro-checkbox-wrapper">
              <input
                type="checkbox"
                id="terminos"
                name="terminos"
                checked={terminos}
                onChange={() => setTerminos(!terminos)}
                required
              />
              <span>
                Acepto los <a href="/terminos-condiciones" target="_blank">términos y condiciones</a>
              </span>
            </label>
          </div>

          <button type="submit" disabled={!terminos}>
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;

};

export default Registro;
