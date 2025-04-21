
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Montos() {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [montos, setMontos] = useState({});
  const [fechaCFDI, setFechaCFDI] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formularioDatos"));
    if (!data || !data.tipoDocumento || !data.mesesSeleccionados) {
      alert("Información incompleta. Regresando al formulario.");
      router.push("/formulario");
    } else {
      setFormData(data);
      if (data.tipoDocumento === "Contrato") {
        const initMontos = {};
        data.mesesSeleccionados.forEach((mes) => {
          initMontos[mes] = "";
        });
        setMontos(initMontos);
      } else {
        setMontos({ [data.mesesSeleccionados[0]]: "" });
      }
    }
  }, []);

  const handleMontoChange = (mes, value) => {
    setMontos((prev) => ({ ...prev, [mes]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      fechaDelCFDI: fechaCFDI,
      montosPorMes: montos
    };
    localStorage.setItem("formularioDatos", JSON.stringify(finalData));
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
          💵 {formData.tipoDocumento === "Contrato" ? "Ingresar monto mensual" : "Ingresar monto único del CFDI"}
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label><strong>Fecha del CFDI</strong></label><br />
            <input
              type="date"
              required
              value={fechaCFDI}
              onChange={(e) => setFechaCFDI(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                backgroundColor: '#374151',
                border: 'none',
                color: 'white'
              }}
            />
          </div>

          {formData.tipoDocumento === "Contrato" ? (
            Object.keys(montos).map((mes) => (
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
            ))
          ) : (
            <div style={{ marginBottom: '16px' }}>
              <label>Monto</label><br />
              <input
                type="number"
                placeholder="$ Monto"
                required
                value={montos[formData.mesesSeleccionados[0]]}
                onChange={(e) => handleMontoChange(formData.mesesSeleccionados[0], e.target.value)}
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
          )}

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
