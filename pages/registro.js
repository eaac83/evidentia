import React, { useState } from 'react';

const Registro = () => {
  const [email, setEmail] = useState('');
  const [rfc, setRfc] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terminos, setTerminos] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación del correo y contraseñas
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!email || !password) {
      alert('Por favor, complete todos los campos requeridos');
      return;
    }

    // Aquí deberías agregar la lógica para enviar los datos al backend

    alert('Formulario enviado!');

    // Aquí sería la lógica de redirección
    // Redirigir a una página de confirmación o al siguiente paso
  };

  return (
    <div className="registro-form">
      <h2>Formulario de Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>RFC (Opcional)</label>
          <input
            type="text"
            value={rfc}
            onChange={(e) => setRfc(e.target.value)}
            pattern="[A-Za-z]{3}[0-9]{2}[0-9]{2}[0-9]{2}[A-Za-z0-9]{3}"
            title="Formato RFC válido"
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={terminos}
              onChange={() => setTerminos(!terminos)}
              required
            />
            Acepto los <a href="/terminos-condiciones">términos y condiciones</a>
          </label>
        </div>
        <div>
          <button type="submit" disabled={!terminos}>
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registro;

