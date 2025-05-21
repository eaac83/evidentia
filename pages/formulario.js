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
    <div className="registro-container">
      <div className="registro-card">
        <h2 className="registro-title">📝 Solicitud de Evidencia y Soporte Documental</h2>
        <form onSubmit={handleSubmit} className="registro-form">

          <label>Tipo de documento</label>
          <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange}>
            <option value="CFDI">CFDI</option>
            <option value="Contrato">Contrato</option>
          </select>

          <label>Razón social del receptor</label>
          <input name="receptor" required onChange={handleChange} />

          <label>Actividad principal o giro (opcional)</label>
          <input name="actividad" onChange={handleChange} />

          <label>Correo o medio de contacto</label>
          <input name="contacto" required onChange={handleChange} />

          <hr />

          <label>Razón social del proveedor</label>
          <input name="proveedor" required onChange={handleChange} />

          <label>RFC del proveedor</label>
          <input name="rfcProveedor" required onChange={handleChange} />

          <label>Código SAT del servicio</label>
          <input name="codigoSAT" required onChange={handleChange} />

          <label>Descripción SAT del servicio</label>
          <input name="descripcionSAT" required onChange={handleChange} />

          <label>Descripción del CFDI del servicio prestado</label>
          <input name="descripcionCFDI" onChange={handleChange} />

          <label>Fecha del CFDI o Contrato</label>
          <input type="date" name="fechaCFDI" required onChange={handleChange} />

          <label>Selecciona los meses a justificar:</label>
          <div className="meses-grid">
            {meses.map((mes) => (
              <label key={mes} htmlFor={mes} className="mes-label">
  <input
    type="checkbox"
    id={mes}
    checked={formData.mesesSeleccionados.includes(mes)}
    onChange={() => toggleMes(mes)}
    disabled={formData.tipoDocumento === "CFDI" && formData.mesesSeleccionados.length === 1 && !formData.mesesSeleccionados.includes(mes)}
  />
  {mes}
</label>

            ))}
          </div>

          <label>Notas adicionales (opcional)</label>
          <input name="notas" onChange={handleChange} />

          <button type="submit" disabled={!formData.contacto}>
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
