
import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";

export default function Preview() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("formularioDatos");
    if (stored) {
      setDatos(JSON.parse(stored));
    }
  }, []);

  const descargarPDF = () => {
    const element = document.getElementById("cotizacion");
    html2pdf().from(element).set({
      margin: 10,
      filename: "cotizacion_cliente.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    }).save();
  };

  const descargarWord = () => {
    const costo = 50;
    const mensaje = `⚠️ Esta opción tiene un costo adicional de $${costo} MXN.\n¿Deseas continuar con la descarga del archivo editable?`;
    if (confirm(mensaje)) {
      window.open("/Cotizacion_Ejemplo_Editable_Final.docx", "_blank");
    }
  };

  if (!datos) {
    return <div className="text-center p-10 text-white">No hay datos disponibles para mostrar.</div>;
  }

  return (
    <div className="bg-[#0D1117] min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto bg-[#1F2937] p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">📑 Cotización generada</h1>
        <div className="mb-6">
          <button onClick={descargarPDF} className="bg-blue-400 text-black px-4 py-2 rounded mr-4">
            📥 Descargar PDF
          </button>
          <button onClick={descargarWord} className="bg-yellow-400 text-black px-4 py-2 rounded">
            📄 Descargar Word (editable)
          </button>
        </div>

        <div id="cotizacion" className="bg-white text-black p-6 rounded">
          <h2 className="text-center text-xl font-bold mb-6">COTIZACIÓN DE SERVICIOS</h2>
          <div className="mb-2"><strong>Cliente:</strong> {datos.receptor}</div>
          <div className="text-right mb-4"><strong>Fecha:</strong> {datos.fechaCotizacion}</div>

          <p className="text-justify mb-4">
            Por medio del presente documento, nos es grato presentar la cotización correspondiente a los servicios solicitados por su empresa.
            El servicio de <strong>“{datos.descripcionSAT}”</strong> ha sido diseñado para atender de forma precisa las necesidades específicas de su operación.
            Nuestra propuesta abarca una solución integral y personalizada, considerando los estándares técnicos y administrativos necesarios para una correcta implementación
            y validación ante cualquier ente fiscal o corporativo.
          </p>

          <p className="text-justify mb-4">
            En función de lo anterior, ponemos a su disposición el desglose detallado del servicio prestado por cada uno de los meses indicados,
            contemplando las evidencias correspondientes que respaldan su materialidad.
          </p>

          <p className="text-justify mb-4">
            Nuestro equipo se encuentra a su disposición para cualquier aclaración, adecuación o ampliación del servicio,
            asegurando en todo momento una atención profesional y eficiente.
          </p>

          <p className="text-justify mb-4 italic text-blue-600">
            En el caso de contratación de nuestros servicios y para mayor detalle de estos podrá consultar la información contenida en el contrato correspondiente.
          </p>

          <table className="w-full mb-4 border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left p-2 border border-gray-300">Concepto</th>
                <th className="text-right p-2 border border-gray-300">Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">Servicio profesional: {datos.descripcionSAT}</td>
                <td className="text-right p-2 border border-gray-300">${datos.montoCotizado?.toLocaleString()} MXN</td>
              </tr>
            </tbody>
          </table>

          <div className="text-justify mb-4">
            <strong>Términos y condiciones:</strong><br />
            - La vigencia de esta cotización es de 5 días naturales.<br />
            - Este documento no representa un contrato vinculante hasta ser aceptado y firmado por ambas partes.<br />
            - Los precios aquí expresados no incluyen IVA.<br />
            - El servicio se prestará en los términos establecidos y puede requerir coordinación previa.
          </div>

          <p className="text-justify mb-8">
            Agradecemos sinceramente el interés mostrado en nuestros servicios. Estamos comprometidos en ofrecerle soluciones de alto valor que respondan a sus expectativas.
            Para cualquier duda, comentario o aclaración, no dude en ponerse en contacto con nosotros. Será un placer atenderle.
          </p>

          <div className="text-center font-bold">
            ÁREA COMERCIAL<br />
            {datos.proveedor}
          </div>
        </div>
      </div>
    </div>
  );
}
