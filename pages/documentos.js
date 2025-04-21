
import { useEffect, useState } from "react";

export default function Documentos() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("formularioDatos"));
    setData(stored);
  }, []);

  const descargarPDF = async (id, nombreArchivo) => {
    if (typeof window !== "undefined") {
      const html2pdf = (await import("html2pdf.js")).default;
      const elemento = document.getElementById(id);
      const opt = {
        margin: 0.5,
        filename: nombreArchivo,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
      };
      html2pdf().set(opt).from(elemento).save();
    }
  };

  if (!data) return <p style={{ color: 'white', padding: 40 }}>Cargando datos...</p>;

  return (
    <div style={{ backgroundColor: '#0D1117', minHeight: '100vh', color: 'white', padding: '40px' }}>
      <div style={{ maxWidth: '900px', margin: 'auto' }}>
        <h1 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '30px' }}>
          📂 Documentos por Mes
        </h1>

        {data.mesesSeleccionados.map((mes) => (
          <div key={mes} style={{
            marginBottom: '60px',
            borderBottom: '1px solid #374151',
            paddingBottom: '40px'
          }}>
            <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>🗓 {mes}</h2>

            {/* COTIZACIÓN */}
            <div id={`cotizacion-${mes}`} style={{
              backgroundColor: '#1F2937',
              padding: '30px',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <h2 style={{ textAlign: 'center', fontSize: '20px', marginBottom: '30px' }}>COTIZACIÓN DE SERVICIOS</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <p><strong>Cliente:</strong> {data.receptor}</p>
                <p><strong>Fecha:</strong> {data.fechasPorMes?.[mes]}</p>
              </div>
              <p style={{ textAlign: 'justify', lineHeight: '1.6em' }}>
                Por medio de la presente cotización, hacemos de su conocimiento que se le podrá brindar el servicio de <strong>{data.descripcionSAT}</strong> con base en el requerimiento solicitado por su parte para el mes de <strong>{mes}</strong>. El costo estimado del servicio es de <strong>${data.montosPorMes?.[mes]}</strong>.
              </p>
              <p style={{ marginTop: '10px', textAlign: 'justify' }}>
                En el caso de contratación de nuestros servicios y para mayor detalle de estos podrá consultar la información contenida en el contrato correspondiente.
              </p>
              <p style={{ marginTop: '20px', textAlign: 'justify' }}>
                De antemano agradecemos el interés mostrado por nuestros servicios y agradecemos su preferencia. Quedamos a su entera disposición para cualquier duda, comentario y/o aclaración.
              </p>
              <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <p><em>DEPARTAMENTO DE VENTAS</em></p>
                <p>{data.proveedor}</p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <button
                onClick={() => descargarPDF(`cotizacion-${mes}`, `cotizacion_${mes}.pdf`)}
                style={{
                  backgroundColor: '#4ADE80',
                  color: '#000',
                  fontWeight: 'bold',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  marginRight: '10px',
                  cursor: 'pointer'
                }}>
                Descargar Cotización
              </button>
            </div>

            {/* ACEPTACIÓN */}
            <div id={`aceptacion-${mes}`} style={{
              backgroundColor: '#1F2937',
              padding: '30px',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <h2 style={{ textAlign: 'center', fontSize: '20px', marginBottom: '30px' }}>ACEPTACIÓN DEL SERVICIO</h2>
              <p style={{ textAlign: 'justify', lineHeight: '1.6em' }}>
                El suscrito representante legal de <strong>{data.receptor}</strong> acepta la cotización arriba descrita correspondiente al mes de <strong>{mes}</strong>, así como los términos y condiciones propuestos por el proveedor <strong>{data.proveedor}</strong>, por un monto total de <strong>${data.montosPorMes?.[mes]}</strong>.
              </p>
              <p style={{ marginTop: '20px' }}>
                Fecha de aceptación: {data.fechasPorMes?.[mes]}
              </p>
              <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <p>_______________________________</p>
                <p>Firma del Representante Legal</p>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => descargarPDF(`aceptacion-${mes}`, `aceptacion_${mes}.pdf`)}
                style={{
                  backgroundColor: '#93C5FD',
                  color: '#000',
                  fontWeight: 'bold',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                Descargar Aceptación
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
