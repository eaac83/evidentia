
import { useState } from "react";
import { useRouter } from "next/router";

export default function Formulario() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tipoDocumento: "CFDI",
    receptor: "",
    actividad: "",
    contacto: "",
    proveedor: "",
    rfcProveedor: "",
    codigoSAT: "",
    descripcionSAT: "",
    descripcionCFDI: "",
    fechaCFDI: "",
    mesesSeleccionados: [],
    notas: ""
  });

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleMes = (mes) => {
    if (formData.tipoDocumento === "CFDI") {
      setFormData({ ...formData, mesesSeleccionados: [mes] });
    } else {
      const seleccionados = formData.mesesSeleccionados.includes(mes)
        ? formData.mesesSeleccionados.filter((m) => m !== mes)
        : [...formData.mesesSeleccionados, mes];
      setFormData({ ...formData, mesesSeleccionados: seleccionados });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("formularioDatos", JSON.stringify(formData));
    router.push("/montos");
  };

  return (
    <div style={{ backgroundColor: '#0D1117', minHeight: '100vh', padding: '40px', color: 'white' }}>
      <form onSubmit={handleSubmit} style={{
        maxWidth: '800px',
        margin: 'auto',
        backgroundColor: '#1F2937',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.4)'
      }}>
        <h1 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}>
          📝 Solicitud de Evidencia y Soporte Documental
        </h1>

        <div style={{ marginBottom: '20px' }}>
          <label><strong>Tipo de documento</strong></label><br />
          <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', color: 'white' }}>
            <option value="CFDI">CFDI</option>
            <option value="Contrato">Contrato</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Razón social del receptor</label><br />
          <input name="receptor" required onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', color: 'white' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Actividad principal o giro (opcional)</label><br />
          <input name="actividad" onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', color: 'white' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Correo o medio de contacto</label><br />
          <input name="contacto" required onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', color: 'white' }} />
        </div>

        <hr style={{ borderColor: '#374151', margin: '20px 0' }} />

        <div style={{ marginBottom: '20px' }}>
          <label>Razón social del proveedor</label><br />
          <input name="proveedor" required onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', color: 'white' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>RFC del proveedor</label><br />
          <input name="rfcProveedor" required onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', color: 'white' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Código SAT del servicio</label><br />
          <input name="codigoSAT" required onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', color: 'white' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Descripción SAT del servicio</label><br />
          <input name="descripcionSAT" required onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', color: 'white' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Descripción del CFDI del servicio prestado</label><br />
          <input name="descripcionCFDI" onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', color: 'white' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Fecha del CFDI o Contrato</label><br />
          <input type="date" name="fechaCFDI" required onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', color: 'white' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Selecciona los meses a justificar:</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px', marginTop: '10px' }}>
            {meses.map((mes) => (
              <div key={mes}>
                <input
                  type="checkbox"
                  id={mes}
                  checked={formData.mesesSeleccionados.includes(mes)}
                  onChange={() => toggleMes(mes)}
                  disabled={formData.tipoDocumento === "CFDI" && formData.mesesSeleccionados.length === 1 && !formData.mesesSeleccionados.includes(mes)}
                />
                <label htmlFor={mes} style={{ marginLeft: '8px' }}>{mes}</label>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Notas adicionales (opcional)</label><br />
          <input name="notas" onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', color: 'white' }} />
        </div>

        <button type="submit" style={{
          width: '100%',
          padding: '14px',
          backgroundColor: '#4ADE80',
          color: '#000',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          Continuar
        </button>
      </form>
    </div>
  );
}
