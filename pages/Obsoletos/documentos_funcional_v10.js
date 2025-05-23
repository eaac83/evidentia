import { useEffect, useState } from "react";
import jsPDF from "jspdf";

// Función IA-Simulada integrada (simplificada para evitar errores)
function obtenerTextoSimuladoIA(descripcionSAT) {
  if (!descripcionSAT) return "";
  const desc = descripcionSAT.toLowerCase();
  if (desc.includes("limpieza") || desc.includes("mantenimiento"))
    return "El servicio incluye actividades de limpieza, conservación y mantenimiento preventivo de instalaciones físicas, garantizando condiciones óptimas de higiene y funcionamiento.";
  if (desc.includes("consultoría") || desc.includes("consultoria"))
    return "Se brinda asesoría estratégica enfocada en la mejora operativa y organizacional de las unidades administrativas involucradas.";
  if (desc.includes("suministro") || desc.includes("logística"))
    return "Se realiza un análisis logístico para mejorar el aprovisionamiento, almacenamiento y distribución de productos o servicios.";
  return "El servicio incluye actividades profesionales que cumplen con los objetivos técnicos y administrativos definidos entre las partes.";
}

export default function Documentos() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("formularioDatos"));
    setDatos(stored);
  }, []);

  const generarPDF = () => {
    const doc = new jsPDF();
    const margin = 15;
    let y = margin;

    const total = Object.values(datos?.montosPorMes || {}).reduce((acc, val) => acc + parseFloat(val || 0), 0);
    const fecha = new Date(datos.fechaCFDI);
    const fechaTexto = fecha.toLocaleDateString("es-MX", { day: "2-digit", month: "2-digit", year: "numeric" });

    const textoIA = obtenerTextoSimuladoIA(datos.descripcionSAT);

    doc.setFontSize(14);
    doc.text("COTIZACIÓN DE SERVICIOS", 105, y, { align: "center" }); y += 12;

    doc.setFontSize(11);
    doc.text(`Cliente: ${datos.receptor}`, margin, y);
    doc.text(`Fecha de emisión: ${fechaTexto}`, 200 - margin, y, { align: "right" }); y += 12;

    const p1 = `Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios. Con base en las diferentes pláticas sostenidas con personal de su empresa y a efecto de continuar con la relación que hemos desarrollado con ${datos.receptor}, nos permitimos hacerle llegar la cotización de los siguientes servicios:`;
    const p2 = `${datos.descripcionCFDI}, ${textoIA}`;

    [p1, p2].forEach(p => {
      const lines = doc.splitTextToSize(p, 180);
      doc.text(lines, margin, y);
      y += lines.length * 8;
    });

    y += 8;
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text("COSTO", 105, y, { align: "center" }); y += 10;
    doc.setFont(undefined, "normal");
    doc.text(`${datos.descripcionCFDI}`, 105, y, { align: "center" }); y += 10;
    doc.text(`$${total.toLocaleString("es-MX")}`, 105, y, { align: "center" }); y += 20;

    doc.save("cotizacion.pdf");
  };

  if (!datos) return <div style={{ padding: 40, color: 'white' }}>Cargando datos...</div>;

  const textoIA = obtenerTextoSimuladoIA(datos.descripcionSAT);

  return (
    <div style={{ padding: 40, color: '#f9fafb' }}>
      <h2 style={{ textAlign: "center" }}>Vista previa del documento</h2>
      <div style={{
        backgroundColor: "#1f2937",
        padding: 24,
        borderRadius: 8,
        maxWidth: 800,
        margin: "auto",
        userSelect: "none"
      }}>
        <h3 style={{ textAlign: "center", color: "#f3f4f6" }}>COTIZACIÓN DE SERVICIOS</h3>
        <p><strong>Cliente:</strong> {datos.receptor}</p>
        <p style={{ textAlign: "right" }}><strong>Fecha de emisión:</strong> {new Date(datos.fechaCFDI).toLocaleDateString("es-MX")}</p>
        <p style={{ textAlign: "justify", color: "#d1d5db" }}>
          Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios. Con base en las diferentes pláticas sostenidas con personal de su empresa y a efecto de continuar con la relación que hemos desarrollado con {datos.receptor}, nos permitimos hacerle llegar la cotización de los siguientes servicios:
        </p>
        <p style={{ textAlign: "justify", color: "#d1d5db" }}>
          {datos.descripcionCFDI}, {textoIA}
        </p>
        <p style={{ textAlign: "center", marginTop: 20, color: "#9ca3af" }}>⚠️ Esta es una vista parcial. El documento completo se genera al descargar el PDF.</p>
      </div>

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button onClick={generarPDF} style={{
          backgroundColor: "#10b981",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Descargar PDF
        </button>
      </div>
    </div>
  );
}