
import { useEffect, useState } from "react";

export default function Preview() {
  const [datos, setDatos] = useState(null);
  const [registro, setRegistro] = useState(null);
  const [mesActivo, setMesActivo] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formularioData"));
    const registros = JSON.parse(localStorage.getItem("evidentia_solicitudes") || "[]");
    const ultimo = registros[registros.length - 1];
    setDatos(data);
    setRegistro(ultimo);
    if (ultimo?.mesesSolicitados?.length > 0) {
      setMesActivo(ultimo.mesesSolicitados[0]);
    }
  }, []);

  if (!datos || !registro) return <div style={{ color: 'white', padding: '40px' }}>Cargando...</div>;

  const descargarPDF = () => {
    window.print(); // Simulación temporal
  };

  const enviarCorreo = () => {
    alert("📧 Simulación de envío por correo realizada.");
  };

  const renderMinuta = () => {
    const fecha = registro.minutas[mesActivo];
    return (
      <div style={estilos.hoja}>
        <h2 style={estilos.titulo}>📘 Minuta de entrega – {mesActivo}</h2>
        <p><strong>Fecha:</strong> {fecha}</p>
        <p>Durante el mes de <strong>{mesActivo}</strong>, se realizó la prestación del servicio de acuerdo con el concepto 
          <strong> "{registro.descripcionSAT}"</strong> (SAT: <strong>{registro.codigoSAT}</strong>).</p>
        {registro.actividadSolicitante
          ? <p>Este servicio fue aplicado en el contexto de las actividades que realiza la empresa <strong>{registro.receptor}</strong>, relacionadas con: <strong>{registro.actividadSolicitante}</strong>.</p>
          : <p><em>Esta minuta es de tipo genérica debido a que no se proporcionó la actividad principal del solicitante.</em></p>}
        <p>Se deja constancia de esta prestación como parte del soporte documental mensual.</p>
      </div>
    );
  };

  const estilos = {
    pagina: {
      backgroundColor: "#0D1117",
      color: "#F3F4F6",
      minHeight: "100vh",
      padding: "40px",
      fontFamily: "sans-serif"
    },
    hoja: {
      backgroundColor: "#ffffff",
      color: "#000",
      padding: "40px",
      borderRadius: "10px",
      maxWidth: "800px",
      margin: "40px auto",
      boxShadow: "0 0 10px rgba(0,0,0,0.4)"
    },
    titulo: {
      fontSize: "22px",
      borderBottom: "2px solid #ccc",
      paddingBottom: "10px",
      marginBottom: "20px"
    },
    acciones: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "30px"
    },
    boton: {
      padding: "10px 20px",
      fontWeight: "bold",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer"
    }
  };

  return (
    <div style={estilos.pagina}>
      <h1 style={{ fontSize: "28px", textAlign: "center" }}>📑 Documentos Finales</h1>

      <div style={estilos.hoja}>
        <h2 style={estilos.titulo}>🧾 Cotización</h2>
        <p><strong>Fecha:</strong> {registro.fechaCotizacion}</p>
        <p><strong>Proveedor:</strong> {registro.proveedor}</p>
        <p><strong>Receptor:</strong> {registro.receptor}</p>
        <p><strong>Servicio:</strong> {registro.descripcionSAT} ({registro.codigoSAT})</p>
        <p><strong>Meses:</strong> {registro.mesesSolicitados.join(", ")}</p>
        <p><strong>Total:</strong> ${registro.montoTotal.toLocaleString()} MXN</p>
      </div>

      <div style={estilos.hoja}>
        <h2 style={estilos.titulo}>📄 Aceptación de Cotización</h2>
        <p><strong>Fecha:</strong> {registro.fechaAceptacion}</p>
        <p>El receptor <strong>{registro.receptor}</strong> acepta la cotización presentada por <strong>{registro.proveedor}</strong> 
        para la prestación del servicio descrito como <strong>{registro.descripcionSAT}</strong>.</p>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <label htmlFor="mesSelector">📅 Selecciona un mes para ver la minuta:</label><br />
        <select
          id="mesSelector"
          value={mesActivo}
          onChange={(e) => setMesActivo(e.target.value)}
          style={{ marginTop: "10px", padding: "10px", borderRadius: "6px", fontSize: "16px" }}
        >
          {registro.mesesSolicitados.map((mes) => (
            <option key={mes} value={mes}>{mes}</option>
          ))}
        </select>
      </div>

      {mesActivo && renderMinuta()}

      <div style={estilos.acciones}>
        <button onClick={descargarPDF} style={{ ...estilos.boton, backgroundColor: "#4ADE80", color: "#0D1117" }}>📥 Descargar PDF</button>
        <button onClick={enviarCorreo} style={{ ...estilos.boton, backgroundColor: "#60A5FA", color: "#0D1117" }}>📧 Enviar por correo</button>
        <button onClick={() => window.print()} style={{ ...estilos.boton, backgroundColor: "#FBBF24", color: "#0D1117" }}>🖨️ Imprimir</button>
      </div>
    </div>
  );
}
