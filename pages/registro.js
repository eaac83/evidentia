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
    <div className="registro-form max-w-2xl mx-auto bg-gray-800 p-6 rounded-xl mt-12">
      <h2 className="text-center text-2xl font-semibold text-orange-400 mb-6">Formulario de Registro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 text-gray-300">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
          />
        </div>
        <div>
          <label htmlFor="rfc" className="block mb-1 text-gray-300">RFC (Opcional)</label>
          <input
            type="text"
            id="rfc"
            name="rfc"
            value={rfc}
            onChange={(e) => setRfc(e.target.value)}
            pattern="[A-Za-z]{3}[0-9]{2}[0-9]{2}[0-9]{2}[A-Za-z0-9]{3}"
            title="Formato RFC válido"
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 text-gray-300">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
          />
        </div>
        <div>
          <label htmlFor="confirmar-password" className="block mb-1 text-gray-300">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmar-password"
            name="confirmar-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
          />
        </div>
        <div>
          <label htmlFor="terminos" className="inline-flex items-center text-gray-300">
            <input
              type="checkbox"
              id="terminos"
              name="terminos"
              checked={terminos}
              onChange={() => setTerminos(!terminos)}
              required
              className="mr-2"
            />
            Acepto los <a href="/terminos-condiciones" className="text-blue-500">términos y condiciones</a>
          </label>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-orange-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-orange-400 transition disabled:opacity-50" disabled={!terminos}>
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registro;
