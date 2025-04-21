
import { useEffect, useState } from "react";

export default function Preview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formularioDatos"));
    setData(storedData);
  }, []);

  if (!data) {
    return (
      <div style={{ backgroundColor: '#0D1117', minHeight: '100vh', color: 'white', padding: '40px' }}>
        <div style={{ maxWidth: '700px', margin: 'auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px' }}>No hay datos disponibles que mostrar</h1>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0D1117', minHeight: '100vh', color: 'white', padding: '40px' }}>
      <div style={{
        maxWidth: '800px',
        margin: 'auto',
        backgroundColor: '#1F2937',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.4)'
      }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>
          🧾 Resumen de la Solicitud
        </h1>

        <div style={{ marginBottom: '20px' }}>
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

        <div style={{ marginBottom: '20px' }}>
          <h3>📆 Detalle por Mes:</h3>
          {data.mesesSeleccionados && data.mesesSeleccionados.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #374151' }}>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Mes</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Fecha del CFDI</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Monto</th>
                </tr>
              </thead>
              <tbody>
                {data.mesesSeleccionados.map((mes) => (
                  <tr key={mes}>
                    <td style={{ padding: '8px' }}>{mes}</td>
                    <td style={{ padding: '8px' }}>{data.fechasPorMes?.[mes] || '—'}</td>
                    <td style={{ padding: '8px' }}>${data.montosPorMes?.[mes] || '0.00'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No se seleccionaron meses.</p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>📝 Notas adicionales:</h3>
          <p>{data.notas || 'Ninguna'}</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button style={{
            backgroundColor: '#4ADE80',
            color: '#000',
            padding: '12px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer'
          }}>
            Vista previa de documentos
          </button>
        </div>
      </div>
    </div>
  );
}
