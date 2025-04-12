
import { useState } from "react";
import { useRouter } from "next/router";

const mesesDelAnio = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function Formulario() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    codigoSAT: "86101709",
    descripcionSAT: "Servicios de capacitación en seguridad",
    detalleServicio: "",
    mesesSeleccionados: [],
    proveedor: "",
    receptor: "",
    email: "",
    notas: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleMes = (mes) => {
    setFormData((prev) => {
      const yaMarcado = prev.mesesSeleccionados.includes(mes);
      return {
        ...prev,
        mesesSeleccionados: yaMarcado
          ? prev.mesesSeleccionados.filter((m) => m !== mes)
          : [...prev.mesesSeleccionados, mes]
      };
    });
  };

  const continuar = () => {
    localStorage.setItem("formularioData", JSON.stringify(formData));
    router.push("/resumen");
  };

  const total = formData.mesesSeleccionados.length * 500;

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px"
  };

  const inputStyle = {
    backgroundColor: "#161B22",
    border: "1px solid #30363d",
    color: "#F3F4F6",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "14px"
  };

  const labelStyle = {
    marginBottom: "6px",
    fontWeight: "bold",
    color: "#9CA3AF"
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0D1117", padding: "40px", color: "white", fontFamily: "sans-serif" }}>
      <div style={{
        maxWidth: "700px",
        margin: "0 auto",
        backgroundColor: "#1F2937",
        borderRadius: "12px",
        padding: "30px",
        boxShadow: "0 0 20px rgba(0,0,0,0.4)"
      }}>
        <h1 style={{ fontSize: "24px", marginBottom: "20px", color: "#F3F4F6" }}>📝 Solicitar Evidencia Documental</h1>

        <div style={fieldStyle}>
          <label style={labelStyle}>Código SAT</label>
          <input name="codigoSAT" value={formData.codigoSAT} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Descripción oficial SAT</label>
          <input name="descripcionSAT" value={formData.descripcionSAT} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Descripción del servicio prestado</label>
          <textarea name="detalleServicio" value={formData.detalleServicio} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Meses a trabajar</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginTop: "10px" }}>
            {mesesDelAnio.map((mes) => (
              <label key={mes} style={{ fontSize: "14px" }}>
                <input
                  type="checkbox"
                  checked={formData.mesesSeleccionados.includes(mes)}
                  onChange={() => toggleMes(mes)}
                  style={{ marginRight: "8px" }}
                />
                {mes}
              </label>
            ))}
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Razón social del proveedor (quien emitió el CFDI)</label>
          <input name="proveedor" value={formData.proveedor} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Razón social del receptor (usted)</label>
          <input name="receptor" value={formData.receptor} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Email de contacto</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Notas adicionales (opcional)</label>
          <textarea name="notas" value={formData.notas} onChange={handleChange} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div style={{ padding: "20px", backgroundColor: "#111827", borderRadius: "10px", color: "#F3F4F6" }}>
          <p><strong>Total a pagar:</strong> ${total.toLocaleString()} MXN</p>
          <p>Incluye:</p>
          <ul>
            <li>1 Cotización</li>
            <li>1 Aceptación del servicio</li>
            <li>{formData.mesesSeleccionados.length} evidencias</li>
            <li>{formData.mesesSeleccionados.length} minutas</li>
          </ul>
          {formData.mesesSeleccionados.length > 0 && (
            <p><strong>Meses seleccionados:</strong> {formData.mesesSeleccionados.join(", ")}</p>
          )}
        </div>

        <button onClick={continuar} style={{
          marginTop: "30px",
          padding: "12px 24px",
          backgroundColor: "#4ADE80",
          color: "#0D1117",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          Continuar
        </button>
      </div>
    </div>
  );
}
