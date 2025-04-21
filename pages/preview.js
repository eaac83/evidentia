
import { useEffect, useState } from "react";

export default function Preview() {
  const [datos, setDatos] = useState(null);
  const [registro, setRegistro] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formularioData"));
    const registros = JSON.parse(localStorage.getItem("evidentia_solicitudes") || "[]");
    const ultimo = registros[registros.length - 1];
    setDatos(data);
    setRegistro(ultimo);
  }, []);

  if (!datos || !registro) return <div style={{ color: 'white', padding: '40px' }}>Cargando...</div>;

  const generarMinutas = () => {
    return Object.entries(registro.minutas).map(([mes, fecha]) => (
      <div key={mes} style={{ marginBottom: "30px", padding: "20px", background: "#1F2937", borderRadius: "12px" }}>
        <h3 style={{ fontSize: "18px", marginBottom: "10px", color: "#60A5FA" }}>Minuta de entrega – {mes}</h3>
        <p><strong>Fecha de entrega:</strong> {fecha}</p>
        <p style={{ marginTop: "10px" }}>
          Durante el mes de <strong>{mes}</strong>, se realizó la prestación del servicio de acuerdo con el concepto 
          <strong> "{registro.descripcionSAT}"</strong>, registrado bajo el código SAT <strong>{registro.codigoSAT}</strong>.
        </p>
        {registro.actividadSolicitante
          ? <p>Este servicio fue aplicado en el contexto de las actividades que realiza la empresa, relacionadas con: <strong>{registro.actividadSolicitante}</strong>.</p>
          : <p><em>Esta minuta es de tipo genérica debido a que no se proporcionó la actividad principal del solicitante.</em></p>}
        <p>Se deja constancia de esta prestación como parte del soporte documental mensual.</p>
      </div>
    ));
  };

  return (
    <div style={{ backgroundColor: "#0D1117", color: "#F3F4F6", minHeight: "100vh", padding: "40px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>📑 Simulador de Documentos Finales</h1>

      {/* COTIZACIÓN */}
      <div style={{ marginBottom: "40px", backgroundColor: "#1F2937", padding: "20px", borderRadius: "12px" }}>
        <h2 style={{ fontSize: "22px", color: "#4ADE80" }}>🧾 Cotización</h2>
        <p><strong>Fecha:</strong> {registro.fechaCotizacion}</p>
        <p><strong>Proveedor:</strong> {registro.proveedor}</p>
        <p><strong>Receptor:</strong> {registro.receptor}</p>
        <p><strong>Servicio:</strong> {registro.descripcionSAT} ({registro.codigoSAT})</p>
        <p><strong>Meses solicitados:</strong> {registro.mesesSolicitados.join(", ")}</p>
        <p><strong>Monto total:</strong> ${registro.montoTotal.toLocaleString()} MXN</p>
      </div>

      {/* ACEPTACIÓN */}
      <div style={{ marginBottom: "40px", backgroundColor: "#1F2937", padding: "20px", borderRadius: "12px" }}>
        <h2 style={{ fontSize: "22px", color: "#FBBF24" }}>📄 Aceptación de Cotización</h2>
        <p><strong>Fecha:</strong> {registro.fechaAceptacion}</p>
        <p>Por medio del presente documento, el receptor <strong>{registro.receptor}</strong> acepta formalmente 
        la cotización del servicio <strong>{registro.descripcionSAT}</strong>, emitida por el proveedor <strong>{registro.proveedor}</strong>.</p>
        <p>Esta aceptación implica conformidad con el alcance, monto y fechas propuestas.</p>
      </div>

      {/* MINUTAS */}
      <h2 style={{ fontSize: "22px", marginBottom: "10px", color: "#60A5FA" }}>📘 Minutas / Evidencias</h2>
      {generarMinutas()}
    </div>
  );
}
