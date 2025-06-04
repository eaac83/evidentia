import { useState, useEffect } from "react";

export default function Documentos() {
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState("Solicitud del servicio");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [costoEditable, setCostoEditable] = useState(0);

  useEffect(() => {
    calcularCostoEditable();
  }, []);

  const calcularCostoEditable = () => {
    const servicioBase = 500;
    const ivaServicio = servicioBase * 0.16;
    const totalBase = servicioBase + ivaServicio;

    const adicional = totalBase * 0.15;
    const ivaAdicional = adicional * 0.16;
    const totalAdicional = adicional + ivaAdicional;

    setCostoEditable(totalAdicional);
  };

  const handleDescargar = () => {
    alert(`Simulación: Descarga normal de ${documentoSeleccionado}`);
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
            <option>Solicitud del servicio</option>
            <option>Cotización del servicio</option>
            <option>Aceptación del servicio</option>
            <option>Plan de trabajo</option>
            <option>Minuta mensual de entrega de resultados</option>
            <option>Evidencia documental final</option>
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
              La descarga editable de este documento tiene un costo adicional de: <strong>${costoEditable.toFixed(2)}</strong> pesos.
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
