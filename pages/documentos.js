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
    const lineHeight = 10;
    let y = margin;

    // Cotización
    doc.setFontSize(14);
    doc.text("COTIZACIÓN DE SERVICIOS", 105, y, { align: "center" });
    y += lineHeight * 2;

    doc.setFontSize(11);
    doc.text(`Cliente: ${datos.receptor}`, margin, y); y += lineHeight;
    doc.text(`Fecha de emisión: ${datos.fechaCFDI}`, margin, y); y += lineHeight;

    const textoCotizacion = [
      `Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios.`,
      `Con base en las diferentes pláticas sostenidas con personal de su empresa y a efecto de continuar con la relación que hemos desarrollado con ${datos.receptor}, nos permitimos hacerle llegar la cotización de los siguientes servicios:`,
      ``,
      `${datos.descripcionCFDI}, mismo que consiste de manera enunciativa más no limitativa en el estudio mediante la proyección y evaluación de estados financieros y bitácora de seguimiento para la determinación del valor de inversión necesario para la obtención de un bien producido.`,
      ``,
      `Monto estimado del servicio: $${Object.values(datos.montosPorMes || {})[0]}`,
      ``,
      `TÉRMINOS Y CONDICIONES:`,
      `- Nuestros costos se manejan en moneda nacional.`,
      `- Los costos descritos no incluyen IVA.`,
      `- La presente cotización tendrá vigencia de 30 días a partir de la fecha.`,
    ];

    textoCotizacion.forEach(p => {
      const lines = doc.splitTextToSize(p, 180);
      doc.text(lines, margin, y);
      y += lines.length * lineHeight;
    });

    y += lineHeight;
    doc.text("DEPARTAMENTO DE VENTAS", margin, y, { fontStyle: "italic" }); y += lineHeight;
    doc.text(`${datos.proveedor}`, margin, y); y += lineHeight;

    // Aceptación
    doc.addPage();
    y = margin;

    doc.setFontSize(14);
    doc.text("ACEPTACIÓN DEL SERVICIO", 105, y, { align: "center" }); y += lineHeight * 2;

    doc.setFontSize(11);
    const textoAceptacion = [
      `El suscrito representante legal de ${datos.receptor} acepta la cotización arriba descrita correspondiente al mes de ${datos.mesesSeleccionados?.[0]}, así como los términos y condiciones propuestos por el proveedor ${datos.proveedor}, por un monto total de $${Object.values(datos.montosPorMes || {})[0]}.`,
      ``,
      `Fecha de aceptación: ${datos.fechaCFDI}`
    ];

    textoAceptacion.forEach(p => {
      const lines = doc.splitTextToSize(p, 180);
      doc.text(lines, margin, y);
      y += lines.length * lineHeight;
    });

    y += lineHeight * 2;
    doc.text("______________________________", 105, y, { align: "center" }); y += lineHeight;
    doc.text("Firma del Representante Legal", 105, y, { align: "center" });

    doc.save("cotizacion_y_aceptacion.pdf");
  };

  const generarWord = () => {
    const contenido = `
      COTIZACIÓN DE SERVICIOS

      Cliente: ${datos.receptor}
      Fecha de emisión: ${datos.fechaCFDI}

      Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios.

      ${datos.descripcionCFDI}

      Monto estimado del servicio: $${Object.values(datos.montosPorMes || {})[0]}

      TÉRMINOS Y CONDICIONES:
      - Nuestros costos se manejan en moneda nacional.
      - Los costos descritos no incluyen IVA.
      - La presente cotización tendrá vigencia de 30 días.

      DEPARTAMENTO DE VENTAS
      ${datos.proveedor}

      --------------------------------------------

      ACEPTACIÓN DEL SERVICIO

      El suscrito representante legal de ${datos.receptor} acepta la cotización correspondiente al mes de ${datos.mesesSeleccionados?.[0]}, así como los términos y condiciones propuestos por el proveedor ${datos.proveedor}, por un monto total de $${Object.values(datos.montosPorMes || {})[0]}.

      Fecha de aceptación: ${datos.fechaCFDI}

      Firma del Representante Legal
    `;

    const blob = new Blob([contenido], { type: "application/msword" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cotizacion_y_aceptacion.doc";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!datos) return <div style={{ padding: 40 }}>Cargando información...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h2 style={{ textAlign: "center" }}>Documentos Generados</h2>

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button onClick={generarPDF} style={{ marginRight: 10, background: "#10b981", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>
          Descargar PDF
        </button>
        <button onClick={generarWord} style={{ background: "#3b82f6", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>
          Descargar Word
        </button>
      </div>
    </div>
  );
}