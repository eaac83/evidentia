
import { useState } from 'react';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export default function Documentos() {
  const [tipo, setTipo] = useState('solicitud');

  const textos = {
    solicitud: `
      SOLICITUD DE SERVICIOS

      04 de febrero de 2025

      Dirigido a: [Nombre del Cliente]

      Por medio de la presente, me permito saludarle cordialmente y manifestar nuestro interés en formalizar la solicitud de servicios con su estimada empresa. En atención a las necesidades detectadas en nuestras operaciones, requerimos el siguiente servicio:

      Limpieza de edificios (servicios generales de limpieza y mantenimiento preventivo de oficinas, pasillos, áreas comunes y zonas operativas).

      El presente servicio se solicita para su ejecución durante el periodo estimado correspondiente al mes de febrero de 2025. Esta solicitud es emitida por el área de Dirección Administrativa con el propósito de atender acciones prioritarias para el adecuado funcionamiento institucional.

      Agradecemos su atención a la presente solicitud, quedando atentos para recibir su cotización y condiciones del servicio.

      Atentamente,
      [Nombre del Responsable]
      Dirección Administrativa
    `,

    cotizacion: `
      COTIZACIÓN DE SERVICIOS

      04 de febrero de 2025

      Dirigido a: [Nombre del Cliente]

      Con base en la solicitud formal de servicios emitida el 07 de enero de 2025, y en atención a las conversaciones previas sostenidas con su equipo, nos permitimos hacerle llegar la presente cotización del siguiente servicio:

      Limpieza de edificios (servicios generales de limpieza y mantenimiento preventivo de oficinas, pasillos, áreas comunes y zonas operativas).

      COSTO DEL SERVICIO:
      $580,245
      Quinientos ochenta mil doscientos cuarenta y cinco pesos 00/100 M.N.

      TÉRMINOS Y CONDICIONES:
      - Nuestros costos se manejan en moneda nacional.
      - Los costos reflejados en el presente documento son un valor estimado derivado de la prestación de nuestro servicio.
      - Los costos descritos no incluyen IVA.
      - Cualquier servicio adicional tendrá un costo extra.
      - Los precios pueden cambiar sin previo aviso.
      - Los gastos extraordinarios como viáticos no están incluidos.
      - La presente cotización de servicio tendrá vigencia de 30 días a partir de la expedición del documento.

      Atentamente,
      Departamento de Ventas
      JESUS ALONSO REYNOSO
    `,

    aceptacion: `
      ACEPTACIÓN DE SERVICIOS

      04 de febrero de 2025

      Dirigido a: [Nombre del Cliente]

      En seguimiento a la cotización enviada el 04 de febrero de 2025 por su empresa, me permito informarle que hemos revisado y aceptado los términos y condiciones contenidos en la misma, relativos al siguiente servicio:

      Limpieza de edificios (servicios generales de limpieza y mantenimiento preventivo de oficinas, pasillos, áreas comunes y zonas operativas).

      Confirmamos nuestra conformidad con el monto propuesto, condiciones de ejecución y demás términos establecidos en la cotización, por lo que solicitamos se proceda con la ejecución del servicio en los tiempos acordados.

      Agradecemos su profesionalismo y quedamos atentos al inicio de las actividades correspondientes.

      Atentamente,
      LESLEY NALLELY SALDAÑA GÓMEZ
      Representante Legal
      JAR SOLUCIONES INDUSTRIALES
    `,

    plan: `
      PLAN DE TRABAJO

      04 de febrero de 2025

      Dirigido a: [Nombre del Cliente]

      Con base en la solicitud de servicios recibida el 07 de enero de 2025 y la cotización formal emitida el 04 de febrero de 2025, se presenta el presente plan de trabajo correspondiente al servicio aprobado:

      Limpieza de edificios (servicios generales de limpieza y mantenimiento preventivo de oficinas, pasillos, áreas comunes y zonas operativas).

      Objetivo General:
      Establecer el esquema operativo y logístico para la prestación eficiente y continua del servicio de limpieza y mantenimiento preventivo de las instalaciones del cliente.

      Actividades:
      • Asignación de personal operativo por zona.
      • Elaboración del cronograma mensual de limpieza.
      • Supervisión técnica semanal.
      • Registro en bitácora digital de avance de actividades.
      • Presentación de informe mensual.

      Alcance:
      El servicio incluirá todas las áreas internas y comunes definidas en el levantamiento técnico previo, así como mantenimiento preventivo básico.

      Atentamente,
      JESUS ALONSO REYNOSO
      Departamento Técnico
    `,
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
    const aceptar = confirm(
      "⚠️ La descarga del formato editable (Word) implica un cargo adicional de $58.00 MXN.

" +
      "Se recomienda descargar el documento editable para personalizar con su logotipo o realizar ajustes internos."
    );
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
