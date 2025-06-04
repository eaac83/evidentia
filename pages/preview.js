import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { formatFecha } from '../utils/formatFecha';

export default function Preview() {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("datosCompletos"));
    setData(storedData);
  }, []);

  if (!data) {
    return (
      <div className="registro-container">
        <div className="registro-card">
          <p>No hay datos disponibles que mostrar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h2 className="registro-title">🧾 Resumen de la Solicitud</h2>

        <div className="registro-form">
          <h3>📌 Información General:</h3>
          <p><strong>Tipo de Documento:</strong> {data.tipoDocumento}</p>
          <p><strong>Razón Social (Receptor):</strong> {data.receptor}</p>
          <p><strong>Actividad o Giro:</strong> {data.actividad || 'No especificado'}</p>
          <p><strong>Correo / Contacto:</strong> {data.contacto}</p>
          <p><strong>Proveedor:</strong> {data.proveedor}</p>
          <p><strong>RFC del Proveedor:</strong> {data.rfcProveedor}</p>
          <p><strong>Código SAT:</strong> {data.codigoSAT}</p>
          <p><strong>Descripción SAT:</strong> {data.descripcionSAT}</p>
          <p><strong>Descripción del CFDI:</strong> {data.descripcionCFDI}</p>
        </div>

        <div className="registro-form" style={{ marginTop: '20px' }}>
          <h3>📆 Detalle por Mes:</h3>
          {data.montosFechas ? (
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px" }}>Mes</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Fecha</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Monto</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.montosFechas).map(([mes, valores]) => (
                  <tr key={mes}>
                    <td style={{ padding: "8px" }}>{mes}</td>
                    <td style={{ padding: "8px" }}>{formatFecha(valores.fecha)}</td>
                    <td style={{ padding: "8px" }}>${valores.monto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay montos capturados.</p>
          )}
        </div>

        <div className="registro-form" style={{ marginTop: '20px' }}>
          <h3>📝 Notas adicionales:</h3>
          <p>{data.notas || 'Ninguna'}</p>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => router.push("/documentos")}
            className="btn-formulario"
          >
            Continuar a documentos finales
          </button>
        </div>
      </div>
    </div>
  );
}
