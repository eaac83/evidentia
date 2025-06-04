import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Montos() {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [montos, setMontos] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("formularioDatos");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);

      const initialMontos = {};
      parsedData.mesesSeleccionados.forEach(mes => {
        initialMontos[mes] = "";
      });
      setMontos(initialMontos);
    }
  }, []);

  const handleChange = (mes, value) => {
    setMontos(prevMontos => ({ ...prevMontos, [mes]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const datosCompletos = { ...formData, montos };
    console.log("Datos completos:", datosCompletos);
    localStorage.setItem("datosCompletos", JSON.stringify(datosCompletos));
    router.push("/gpt");
  };

  if (!formData) return <div className="registro-container"><div className="registro-card"><p>Cargando datos...</p></div></div>;

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h2 className="registro-title">📝 Registro de Montos por Mes</h2>
        <form onSubmit={handleSubmit} className="registro-form">
          {formData.mesesSeleccionados.map(mes => (
            <div key={mes}>
              <label htmlFor={mes}>Monto para {mes}:</label>
              <input
                type="number"
                id={mes}
                name={mes}
                value={montos[mes]}
                onChange={(e) => handleChange(mes, e.target.value)}
                required
              />
            </div>
          ))}
          <button type="submit" className="btn-formulario">Continuar</button>
        </form>
      </div>
    </div>
  );
}
