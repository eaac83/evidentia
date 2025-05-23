import { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function Documentos() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("formularioDatos"));
    setDatos(stored);
  }, []);

  const generarPDF = () => {
    const doc = new jsPDF();
    const margin = 15;
    const lineHeight = 8;
    let y = margin;

    const total = Object.values(datos?.montosPorMes || {}).reduce((acc, val) => acc + parseFloat(val || 0), 0);
    const fecha = new Date(datos.fechaCFDI);
    const fechaTexto = fecha.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

    doc.setFontSize(14);
    doc.text("COTIZACIÓN DE SERVICIOS", 105, y, { align: "center" });
    y += 2 * lineHeight;

    doc.setFontSize(11);
    doc.text(`Cliente: ${datos.receptor}`, margin, y);
    doc.text(`Fecha de emisión: ${fechaTexto}`, 200 - margin, y, { align: "right" });
    y += 2 * lineHeight;

    const p1 = `Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios. Con base en las diferentes pláticas sostenidas con personal de su empresa y a efecto de continuar con la relación que hemos desarrollado con ${datos.receptor}, nos permitimos hacerle llegar la cotización de los siguientes servicios:`;
    const p2 = `${datos.descripcionCFDI}, mismo que consiste de manera enunciativa más no limitativa en el estudio mediante la proyección y evaluación de estados financieros y bitácora de seguimiento para la determinación del valor de inversión necesario para la obtención de un bien producido.`;

    [p1, p2].forEach(p => {
      const lines = doc.splitTextToSize(p, 180);
      doc.text(lines, margin, y);
      y += lines.length * lineHeight;
    });

    doc.save("cotizacion.pdf");
  };

  if (!datos) return <div style={{ padding: 40, color: 'white' }}>Cargando datos...</div>;

  const total = Object.values(datos?.montosPorMes || {}).reduce((acc, val) => acc + parseFloat(val || 0), 0);
  const fecha = new Date(datos.fechaCFDI);
  const fechaTexto = fecha.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", color: "#f9fafb" }}>
      <h2 style={{ textAlign: "center" }}>Vista previa del documento</h2>

      <div
        style={{
          backgroundColor: "#1f2937",
          padding: 24,
          borderRadius: 8,
          maxWidth: 800,
          margin: "auto",
          userSelect: "none"
        }}
      >
        <h3 style={{ textAlign: "center", color: "#f3f4f6" }}>COTIZACIÓN DE SERVICIOS</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p><strong>Cliente:</strong> {datos.receptor}</p>
          <p><strong>Fecha de emisión:</strong> {fechaTexto}</p>
        </div>

        <p style={{ textAlign: "justify", color: "#d1d5db" }}>
          Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios. Con base en las diferentes pláticas sostenidas con personal de su empresa y a efecto de continuar con la relación que hemos desarrollado con {datos.receptor}, nos permitimos hacerle llegar la cotización de los siguientes servicios:
        </p>

        <p style={{ textAlign: "justify", color: "#d1d5db" }}>
          {datos.descripcionCFDI}, mismo que consiste de manera enunciativa más no limitativa en el estudio mediante la proyección y evaluación de estados financieros y bitácora de seguimiento para la determinación del valor de inversión necesario para la obtención de un bien producido.
        </p>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <p style={{ color: "#9ca3af" }}>⚠️ Esta es una vista parcial del documento. El contenido completo se genera en el PDF.</p>
        </div>
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