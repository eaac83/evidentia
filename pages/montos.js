
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Montos() {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [montos, setMontos] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formularioDatos"));
    if (!data || !data.mesesSeleccionados) {
      alert("Información incompleta. Regresando al formulario.");
      router.push("/formulario");
    } else {
      setFormData(data);
      const initMontos = {};
      data.mesesSeleccionados.forEach((mes) => {
        initMontos[mes] = "";
      });
      setMontos(initMontos);
    }
  }, []);

  const handleMontoChange = (mes, value) => {
    setMontos((prev) => ({ ...prev, [mes]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formWithMontos = { ...formData, montosPorMes: montos };
    localStorage.setItem("formularioDatos", JSON.stringify(formWithMontos));
    router.push("/preview");
  };

  if (!formData) return null;

  return (
    <div style={{ backgroundColor: '#0D1117', minHeight: '100vh', padding: '40px', color: 'white' }}>
      <div style={{
        maxWidth: '700px',
        margin: 'auto',
        backgroundColor: '#1F2937',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.4)'
      }}>
        <h1 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}>
          💵 Ingresar monto mensual de CFDI
        </h1>

        <form onSubmit={handleSubmit}>
          {formData.mesesSeleccionados.map((mes) => (
            <div key={mes} style={{ marginBottom: '16px' }}>
              <label>{mes}</label><br />
              <input
                type="number"
                placeholder="$ Monto"
                required
                value={montos[mes]}
                onChange={(e) => handleMontoChange(mes, e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '6px',
                  backgroundColor: '#374151',
                  border: 'none',
                  color: 'white'
                }}
              />
            </div>
          ))}

          <button
            type="submit"
            style={{
              marginTop: '20px',
              width: '100%',
              padding: '12px',
              backgroundColor: '#4ADE80',
              color: '#000',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
