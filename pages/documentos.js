import { useState, useEffect } from "react";

export default function Documentos() {
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState("Solicitud del servicio");
  const [data, setData] = useState(null);
  const [documentosConfirmados, setDocumentosConfirmados] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("datosCompletos"));
    setData(storedData);
  }, []);

  const formatFecha = (fecha) => {
  if (!fecha) return "";
  const partes = fecha.split("-");
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
};

  
  const handleConfirmarDocumento = () => {
    setDocumentosConfirmados((prev) => ({
      ...prev,
      [documentoSeleccionado]: true,
    }));
    alert("Contenido confirmado para: " + documentoSeleccionado);
  };

  const renderPrevisualizacion = () => {
    if (!data) return <p>Cargando datos...</p>;

    switch (documentoSeleccionado) {
      case "Solicitud del servicio":
        return (
          <div className="documento-container">
            <div className="titulo-documento">SOLICITUD DE SERVICIOS</div>
            <div className="fecha-documento">
              {data.ciudad || "Ciudad"}, {formatfecha(data.fechaCFDI)}
            </div>

            <div className="seccion">
              <p>{data.receptor} Presente:</p>
            </div>

            <div className="seccion bloque-protegido">
              Contenido protegido. Este documento será visible completamente al generar el expediente.
            </div>

            <div className="seccion">
              <strong>Periodo estimado de ejecución:</strong> [fecha]
            </div>

            <div className="firmas">
              <p>______________________________</p>
              <p>{data.receptor}</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="documento-container">
            <p>No hay plantilla aún para este documento.</p>
          </div>
        );
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h2 className="registro-title">Previsualización de Documentos</h2>

        <div className="registro-form">
          <label>Selecciona el documento:</label>
          <select
            className="registro-form"
            value={documentoSeleccionado}
            onChange={(e) => setDocumentoSeleccionado(e.target.value)}
          >
            <option>Solicitud del servicio</option>
            <option>Cotización del servicio</option>
            <option>Aceptación del servicio</option>
            <option>Plan de trabajo</option>
            <option>Minuta mensual de entrega de resultados</option>
            <option>Evidencia documental final</option>
          </select>
        </div>

        <div style={{ marginTop: "20px" }}>
          {renderPrevisualizacion()}
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button className="btn-formulario" onClick={handleConfirmarDocumento}>
            Confirmar contenido
          </button>
        </div>
      </div>
    </div>
  );
}
