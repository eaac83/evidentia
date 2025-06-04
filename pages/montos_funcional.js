
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Montos() {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [montos, setMontos] = useState({});
  const [fechas, setFechas] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formularioDatos"));
    if (!data || !data.tipoDocumento || !data.mesesSeleccionados) {
      alert("Información incompleta. Regresando al formulario.");
      router.push("/formulario");
    } else {
      setFormData(data);
      const initMontos = {};
      const initFechas = {};
      data.mesesSeleccionados.forEach((mes) => {
        initMontos[mes] = "";
        initFechas[mes] = "";
      });
      setMontos(initMontos);
      setFechas(initFechas);
    }
  }, []);

  const handleMontoChange = (mes, value) => {
    setMontos((prev) => ({ ...prev, [mes]: value }));
  };

  const handleFechaChange = (mes, value) => {
    setFechas((prev) => ({ ...prev, [mes]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      montosPorMes: montos,
      fechasPorMes: fechas
    };
    localStorage.setItem("formularioDatos", JSON.stringify(finalData));
    router.push("/preview");
  };

  if (!formData) return null;

  return (
    <div style={{ backgroundColor: '#0D1117', minHeight: '100vh', padding: '40px', color: 'white' }}>
      <div style={{
        maxWidth: '800px',
        margin: 'auto',
        backgroundColor: '#1F2937',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.4)'
      }}>
        <h1 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}>
          💵 Ingreso de montos y fechas por mes
        </h1>

        <form onSubmit={handleSubmit}>
          {formData.mesesSeleccionados.map((mes) => (
            <div key={mes} style={{ marginBottom: '24px' }}>
              <h3 style={{ marginBottom: '10px' }}>{mes}</h3>
              <div style={{ marginBottom: '10px' }}>
                <label>Monto</label><br />
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
              <div>
                <label>Fecha del CFDI para {mes}</label><br />
                <input
                  type="date"
                  required
                  value={fechas[mes]}
                  onChange={(e) => handleFechaChange(mes, e.target.value)}
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
            </div>
          ))}

          <button
            type="submit"
            style={{
              marginTop: '30px',
              width: '100%',
              padding: '14px',
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
