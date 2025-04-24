import { useEffect, useState } from "react";
import jsPDF from "jspdf";

function obtenerTextoSimuladoIA(descripcionSAT) {
  if (!descripcionSAT) return "";
  const desc = descripcionSAT.toLowerCase();
  if (desc.includes("limpieza")) return "solicitud de servicios generales de limpieza y mantenimiento preventivo en instalaciones administrativas.";
  if (desc.includes("consultoría")) return "asesoría profesional enfocada en la mejora de procesos administrativos y organizacionales.";
  if (desc.includes("logística") || desc.includes("suministro")) return "servicios especializados de análisis y mejora en la cadena de suministro y aprovisionamiento logístico.";
  return "prestación de servicios profesionales conforme a los objetivos operativos definidos.";
}

function generarTexto(tipo, datos) {
  const fechaCFDI = new Date(datos.fechaCFDI);
  const fechaReferencia = new Date(fechaCFDI);
  if (tipo === "solicitud") fechaReferencia.setDate(fechaReferencia.getDate() - 28);
  if (tipo === "aceptacion") fechaReferencia.setDate(fechaReferencia.getDate() - 10);
  if (tipo === "plan") fechaReferencia.setDate(fechaReferencia.getDate() - 5);
  const fecha = fechaReferencia.toLocaleDateString("es-MX", { day: "2-digit", month: "2-digit", year: "numeric" });
  const periodo = fechaCFDI.toLocaleDateString("es-MX", { year: "numeric", month: "2-digit" });
  const textoIA = obtenerTextoSimuladoIA(datos.descripcionSAT);
  const descripcion = `${datos.descripcionCFDI}, ${textoIA}`;
  const receptor = datos.receptor;
  const proveedor = datos.proveedor;
  const total = Object.values(datos?.montosPorMes || {}).reduce((acc, val) => acc + parseFloat(val || 0), 0);
  const totalEnLetra = "Quinientos ochenta mil doscientos cuarenta y cinco pesos 00/100 M.N.";

  let texto = "";

  if (tipo === "solicitud") {
    texto += `Fecha: ${fecha}\n\nPor medio de la presente, me permito saludarle cordialmente y expresar nuestro interés en contar con los servicios que ofrece su empresa. Derivado de las necesidades operativas actuales de nuestra organización, requerimos la prestación del siguiente servicio:\n\n> ${descripcion}\n\nPeriodo estimado de ejecución: ${periodo}\nÁrea solicitante: Dirección Administrativa\nObjetivo: Operación estratégica\n\nAtentamente,\n${receptor}\nÁrea Solicitante`;
  }

  if (tipo === "cotizacion") {
    texto += `Fecha de emisión: ${fecha}\n\n${receptor}\n\n${descripcion}\n\nCOSTO DEL SERVICIO:\n$${total.toLocaleString("es-MX")}\n${totalEnLetra}\n\nTÉRMINOS:\n- Costos en moneda nacional\n- No incluye IVA\n- Sujeto a cambios\n- Vigencia 30 días\n\nAtentamente,\nDEPARTAMENTO DE VENTAS\n${proveedor}`;
  }

  if (tipo === "aceptacion") {
    texto += `Fecha: ${fecha}\n\nEn seguimiento a la cotización enviada por su empresa, me permito informarle que hemos revisado y aceptado los términos y condiciones relativos al siguiente servicio:\n\n> ${descripcion}\n\nConfirmamos nuestra conformidad con el monto propuesto y condiciones.\n\nAtentamente,\n${receptor}\nÁrea Administrativa`;
  }

  if (tipo === "plan") {
    texto += `Fecha: ${fecha}\n\nPlan de trabajo correspondiente al servicio de:\n\n> ${descripcion}\n\nAlcance general: Metodología basada en resultados\nObjetivos:\n- Entregables mensuales\n- Seguimiento técnico\n- Informe final\nInicio estimado: ${fechaCFDI.toLocaleDateString("es-MX")}\nDuración: 30 días\nResponsable técnico: Coordinación Técnica\n\n${proveedor}\nDepartamento Técnico`;
  }

  return texto;
}

export default function Documentos() {
  const [datos, setDatos] = useState(null);
  const [tipo, setTipo] = useState("solicitud");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("formularioDatos"));
    setDatos(stored);
  }, []);

  const generarPDF = () => {
    const doc = new jsPDF();
    const y = 15;
    const texto = generarTexto(tipo, datos);
    doc.setFontSize(14);
    doc.text(tipo.toUpperCase().replace("PLAN", "PLAN DE TRABAJO").replace("ACEPTACION", "ACEPTACIÓN DE SERVICIO").replace("COTIZACION", "COTIZACIÓN DE SERVICIOS").replace("SOLICITUD", "SOLICITUD DE SERVICIOS"), 105, y, { align: "center" });
    doc.setFontSize(11);
    doc.text(doc.splitTextToSize(texto, 180), 15, y + 10);
    doc.save(`${tipo}.pdf`);
  };

  const generarWord = () => {
    const aceptado = confirm("⚠️ Descargar el editable implica un cargo adicional del 10% sobre $500 + IVA. ¿Desea continuar?");
    if (!aceptado) return;
    const contenido = generarTexto(tipo, datos);
    const blob = new Blob([contenido], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${tipo}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!datos) return <div style={{ padding: 40, color: 'white' }}>Cargando datos...</div>;

  return (
    <div style={{ padding: 40, color: '#f9fafb' }}>
      <h2 style={{ textAlign: "center" }}>Vista previa: {tipo.toUpperCase()}</h2>
      <div style={{
        backgroundColor: "#1f2937", padding: 24, borderRadius: 8, maxWidth: 800, margin: "auto", userSelect: "none"
      }}>
        <p style={{ textAlign: "justify", color: "#d1d5db", whiteSpace: "pre-line" }}>
          {generarTexto(tipo, datos)}
        </p>
      </div>
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button onClick={generarPDF} style={{
          backgroundColor: "#10b981", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: 10
        }}>
          Descargar PDF
        </button>
        <button onClick={generarWord} style={{
          backgroundColor: "#f59e0b", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: 10
        }}>
          Descargar Editable
        </button>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{
          padding: "10px", borderRadius: "5px", border: "1px solid #ccc"
        }}>
          <option value="solicitud">Solicitud de Servicios</option>
          <option value="cotizacion">Cotización de Servicios</option>
          <option value="aceptacion">Aceptación del Servicio</option>
          <option value="plan">Plan de Trabajo</option>
        </select>
      </div>
    </div>
  );
}