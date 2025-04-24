
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default function Documentos() {
  const [tipo, setTipo] = useState("solicitud");

  const textos = {
    solicitud: `SOLICITUD DE SERVICIOS

Por medio de la presente, me permito saludarle cordialmente y manifestar nuestro interés en formalizar la solicitud de servicios con su estimada empresa. En atención a las necesidades detectadas en nuestras operaciones, requerimos el siguiente servicio:

Limpieza de edificios (servicios generales de limpieza y mantenimiento preventivo de oficinas, pasillos, áreas comunes y zonas operativas).

El presente servicio se solicita para su ejecución durante el periodo estimado correspondiente al mes 02/2025. Esta solicitud es emitida por el área de Dirección Administrativa con el propósito de atender acciones prioritarias para el adecuado funcionamiento institucional.

Agradecemos su atención a la presente solicitud, quedando atentos para recibir su cotización y condiciones del servicio.

Atentamente,
JAR SOLUCIONES INDUSTRIALES
Dirección Administrativa`,
    cotizacion: `COTIZACIÓN DE SERVICIOS

Con base en la solicitud formal de servicios emitida el 07 de enero de 2025, y en atención a las conversaciones previas sostenidas con su equipo, nos permitimos hacerle llegar la presente cotización del siguiente servicio:

Limpieza de edificios (servicios generales de limpieza y mantenimiento preventivo).

COSTO DEL SERVICIO:
$580,245
Quinientos ochenta mil doscientos cuarenta y cinco pesos 00/100 M.N.

TÉRMINOS Y CONDICIONES:
- Moneda nacional
- No incluye IVA
- Vigencia 30 días

Atentamente,
DEPARTAMENTO DE VENTAS
JESUS ALONSO REYNOSO`,
    aceptacion: `ACEPTACIÓN DE SERVICIO

En seguimiento a la cotización enviada el 04 de febrero de 2025, confirmamos la aceptación conforme al monto propuesto y condiciones:

Limpieza de edificios (servicios generales de limpieza y mantenimiento preventivo).

Atentamente,
JAR SOLUCIONES INDUSTRIALES
Área Administrativa`,
    plan: `PLAN DE TRABAJO

Plan correspondiente al servicio de limpieza de edificios.

Inicio estimado: 04/02/2025
Duración: 30 días
Responsable técnico: JESUS ALONSO REYNOSO

Atentamente,
Departamento Técnico`
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(textos[tipo], 180);
    doc.text(lines, 15, 20);
    doc.save(tipo + ".pdf");
  };

  const generarDOCX = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          ...textos[tipo].split("\n").map(p =>
            new Paragraph({ children: [new TextRun(p)] })
          )
        ]
      }]
    });

    const blob = await Packer.toBlob(doc);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = tipo + ".docx";
    link.click();
  };

  const manejarEditable = () => {
    const aceptar = confirm("⚠️ La descarga del formato editable (Word) implica un cargo adicional de $58.00 MXN.\n\nSe recomienda descargar el documento editable para personalizar con su logotipo o realizar ajustes internos.");
    if (aceptar) generarDOCX();
  };

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: "auto", color: "#f0f0f0", userSelect: "none" }}>
      <h2 style={{ textAlign: "center" }}>{tipo.toUpperCase().replace("COTIZACION", "COTIZACIÓN DE SERVICIOS").replace("ACEPTACION", "ACEPTACIÓN DE SERVICIO")}</h2>
      <div style={{ backgroundColor: "#1f2937", padding: 20, borderRadius: 10, minHeight: 260 }}>
        <pre style={{ whiteSpace: "pre-wrap", fontFamily: "serif", textAlign: "justify", maxHeight: 160, overflow: "hidden" }}>
          {textos[tipo].split("\n").slice(0, 6).join("\n") + "\n..."}
        </pre>
      </div>

      <div style={{ marginTop: 30, textAlign: "center" }}>
        <button onClick={generarPDF} style={{
          backgroundColor: "#10b981", color: "white", padding: "10px 20px",
          border: "none", borderRadius: "5px", cursor: "pointer", marginRight: 10
        }}>
          Descargar PDF
        </button>
        <button onClick={manejarEditable} style={{
          backgroundColor: "#f59e0b", color: "white", padding: "10px 20px",
          border: "none", borderRadius: "5px", cursor: "pointer"
        }}>
          Descargar Editable
        </button>
      </div>

      <div style={{ marginTop: 20, textAlign: "center" }}>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ padding: "10px", borderRadius: "5px" }}>
          <option value="solicitud">Solicitud de Servicios</option>
          <option value="cotizacion">Cotización de Servicios</option>
          <option value="aceptacion">Aceptación del Servicio</option>
          <option value="plan">Plan de Trabajo</option>
        </select>
      </div>
    </div>
  );
}
