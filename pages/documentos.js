import { useState, useEffect } from "react";

export default function Documentos() {
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState("Solicitud de Servicios");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [montoEditable, setMontoEditable] = useState(0);

  useEffect(() => {
    calcularMontoEditable();
  }, []);

  const calcularMontoEditable = () => {
    const servicioBase = 500;
    const iva = servicioBase * 0.16;
    const extra = servicioBase * 0.15;
    const total = servicioBase + iva + extra;
    setMontoEditable(total);
  };

  const handleDescargar = () => {
    alert("Simulación: Descargar documento normal");
  };

  const handleDescargarEditable = () => {
    setMostrarPopup(true);
  };

  const cerrarPopup = () => {
    setMostrarPopup(false);
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h2 className="registro-title">📄 Generación de Documentos</h2>

        <div className="registro-form">
          <label>Selecciona el documento:</label>
          <select
            className="registro-form"
            value={documentoSeleccionado}
            onChange={(e) => setDocumentoSeleccionado(e.target.value)}
          >
            <option>Solicitud de Servicios</option>
            <option>Contrato de Prestación</option>
            <option>Soporte de Materialidad</option>
            <option>Check List Documental</option>
            <option>Certificación de Materialidad</option>
            <option>Expediente del Servicio</option>
          </select>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button className="btn-formulario" onClick={handleDescargar}>
              Descargar
            </button>
            <button
              className="btn-formulario"
              style={{ marginTop: "10px" }}
              onClick={handleDescargarEditable}
            >
              Descargar Editable
            </button>
          </div>
        </div>
      </div>

      {mostrarPopup && (
        <div className="modal active">
          <div className="modal-content">
            <h3>⚠️ Atención</h3>
            <p>
              La descarga en formato editable tiene un costo adicional de <strong>${montoEditable.toFixed(2)}</strong> pesos ya con IVA y cargos incluidos.
            </p>
            <p>¿Deseas continuar?</p>

            <button className="popup-cerrar" onClick={cerrarPopup}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
