import { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Documentos() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("formularioDatos"));
    setDatos(stored);
  }, []);

  const generarPDF = async () => {
    const cotizacionElement = document.getElementById("cotizacion-pdf");
    const aceptacionElement = document.getElementById("aceptacion-pdf");
    const pdf = new jsPDF();

    if (cotizacionElement) {
      const canvas1 = await html2canvas(cotizacionElement, { scale: 2 });
      const imgData1 = canvas1.toDataURL("image/png");
      const imgProps1 = pdf.getImageProperties(imgData1);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight1 = (imgProps1.height * pdfWidth) / imgProps1.width;
      pdf.addImage(imgData1, "PNG", 0, 0, pdfWidth, pdfHeight1);
    }

    if (aceptacionElement) {
      pdf.addPage();
      const canvas2 = await html2canvas(aceptacionElement, { scale: 2 });
      const imgData2 = canvas2.toDataURL("image/png");
      const imgProps2 = pdf.getImageProperties(imgData2);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight2 = (imgProps2.height * pdfWidth) / imgProps2.width;
      pdf.addImage(imgData2, "PNG", 0, 0, pdfWidth, pdfHeight2);
    }

    pdf.save("documento_completo.pdf");
  };

  if (!datos) return <div style={{ padding: 40 }}>Cargando...</div>;

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: "center" }}>📂 Documentos Generados por Mes</h2>

      <div id="cotizacion-pdf" style={{ backgroundColor: "#f3f4f6", padding: 20, marginBottom: 40 }}>
        <h3>📄 Cotización de Servicios</h3>
        <p><strong>Cliente:</strong> {datos.receptor}</p>
        <p><strong>Fecha:</strong> {datos.fechaCFDI}</p>
        <p>
          Por medio de la presente cotización, hacemos de su conocimiento que se le podrá brindar el servicio de <strong>{datos.descripcionSAT}</strong> con base en el requerimiento solicitado por su parte para el mes de <strong>{datos.mesesSeleccionados?.[0]}</strong>.
          El costo estimado del servicio es de <strong>${Object.values(datos.montosPorMes || {})[0]}</strong>.
          En caso de contratación de nuestros servicios, podrá consultar mayor detalle en el contrato correspondiente.
        </p>
        <p>De antemano agradecemos su preferencia.</p>
        <p style={{ fontStyle: "italic", marginTop: 40 }}>DEPARTAMENTO DE VENTAS</p>
        <p><strong>{datos.proveedor}</strong></p>
      </div>

      <div id="aceptacion-pdf" style={{ backgroundColor: "#e5e7eb", padding: 20 }}>
        <h3>✍️ Aceptación del Servicio</h3>
        <p>
          El suscrito representante legal de <strong>{datos.receptor}</strong> acepta la cotización arriba descrita correspondiente al mes de <strong>{datos.mesesSeleccionados?.[0]}</strong>,
          así como los términos y condiciones propuestos por el proveedor <strong>{datos.proveedor}</strong>, por un monto total de <strong>${Object.values(datos.montosPorMes || {})[0]}</strong>.
        </p>
        <p><strong>Fecha de aceptación:</strong> {datos.fechaCFDI}</p>
        <div style={{ marginTop: 60, textAlign: "center" }}>
          <hr style={{ width: "50%" }} />
          <p>Firma del Representante Legal</p>
        </div>
      </div>

      <div style={{ marginTop: 40, textAlign: "center" }}>
        <button onClick={generarPDF} style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Descargar Documento Completo (PDF)
        </button>
      </div>
    </div>
  );
}