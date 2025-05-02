import React, { useState } from 'react';

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

    // Aquí puedes enviar al backend
    alert('Registro enviado');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-md shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-center text-orange-400 mb-6">Formulario de Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-200">Correo electrónico *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 ring-orange-400"
            />
          </div>
          <div>
            <label htmlFor="rfc" className="block mb-1 text-gray-200">RFC (opcional)</label>
            <input
              type="text"
              id="rfc"
              value={rfc}
              onChange={(e) => setRfc(e.target.value)}
              pattern="[A-Za-z]{3,4}[0-9]{6}[A-Za-z0-9]{3}"
              title="Formato RFC válido"
              className="w-full p-3 rounded-md bg-gray-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-200">Contraseña *</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-gray-200">Confirmar Contraseña *</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white"
            />
          </div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terminos"
              checked={terminos}
              onChange={() => setTerminos(!terminos)}
              required
              className="mt-1"
            />
            <label htmlFor="terminos" className="text-gray-300 text-sm">
              Acepto los <a href="/terminos-condiciones" className="text-blue-400 underline">términos y condiciones</a>
            </label>
          </div>
          <button
            type="submit"
            disabled={!terminos}
            className="w-full bg-orange-500 hover:bg-orange-400 text-black font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
