import { useState, useEffect } from "react";
import { formatFecha } from "../utils/formatFecha";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import "../styles/documentos.css";  // Asegúrate que el CSS ya está funcionando

export default function Documentos() {
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState("Solicitud del servicio");
  const [data, setData] = useState(null);
  const [documentosConfirmados, setDocumentosConfirmados] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("datosCompletos"));
    setData(storedData);
  }, []);

  const handleConfirmarDocumento = () => {
    setDocumentosConfirmados((prev) => ({
      ...prev,
      [documentoSeleccionado]: true,
    }));
    alert("Contenido confirmado para: " + documentoSeleccionado);
  };

  const generarWord = () => {
    if (!data) return;

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "SOLICITUD DE SERVICIOS",
                  bold: true,
                  size: 32,
                }),
              ],
              alignment: "center",
              spacing: { after: 400 },
            }),
            new Paragraph({
              text: `${data.ciudadEmision || "Ciudad"}, ${formatFecha(data.fechaCFDI)}`,
              alignment: "right",
              spacing: { after: 400 },
            }),
            new Paragraph({
              text: `${data.receptor} Presente:`,
              spacing: { after: 400 },
            }),
            new Paragraph({
              text: "Contenido protegido. Este documento será visible completamente al generar el expediente.",
              italics: true,
              shading: { fill: "E0E0E0" },
              spacing: { after: 400 },
            }),
            new Paragraph({
              text: `Periodo estimado de ejecución: ${"[fecha]"}`,
              spacing: { after: 400 },
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              text: "____________________________",
              alignment: "center",
            }),
            new Paragraph({
              text: data.receptor,
              alignment: "center",
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Solicitud de Servicios.docx");
    });
  };

  if (!data) return <div>Cargando...</div>;

  return (
    <div className="documentos-contenedor">
      <h2>Previsualización de Documentos</h2>

      <div className="selector-documento">
        <label>Selecciona el documento:</label>
        <select value={documentoSeleccionado} onChange={(e) => setDocumentoSeleccionado(e.target.value)}>
          <option>Solicitud del servicio</option>
          {/* aquí luego agregaremos más documentos */}
        </select>
      </div>

      <div className="documento-preview">
        {documentoSeleccionado === "Solicitud del servicio" && (
          <div className="documento-container">
            <div className="titulo-documento">SOLICITUD DE SERVICIOS</div>
            <div className="fecha-documento">
              {data.ciudadEmision || "Ciudad"}, {formatFecha(data.fechaCFDI)}
            </div>

            <div className="cuerpo-documento">
              <p>{data.receptor} Presente:</p>
              <div className="contenido-protegido">
                <em>Contenido protegido. Este documento será visible completamente al generar el expediente.</em>
              </div>
              <p><b>Periodo estimado de ejecución:</b> [fecha]</p>
            </div>

            <div className="firmas-documento">
              ____________________________ <br />
              {data.receptor}
            </div>
          </div>
        )}
      </div>

      <div className="botones-documento">
        <button className="btn-formulario" onClick={handleConfirmarDocumento}>
          Confirmar contenido
        </button>

        <button className="btn-formulario" onClick={generarWord}>
          Descargar Word
        </button>
      </div>
    </div>
  );
}
