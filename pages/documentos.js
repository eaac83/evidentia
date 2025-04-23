import { useEffect, useState } from "react";

export default function Documentos() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("formularioDatos"));
    setData(stored);
  }, []);

  const descargarPDF = async (mes) => {
    if (typeof window !== "undefined") {
      const html2pdf = (await import("html2pdf.js")).default;
      const elemento = document.getElementById(`documento-${mes}`);
      const opt = {
        margin: 0.5,
        filename: `documento_${mes}.pdf`,
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
          📂 Documentos Generados por Mes
        </h1>

        {data.mesesSeleccionados.map((mes) => (
          <div key={mes} id={`documento-${mes}`} style={{
            backgroundColor: '#1F2937',
            padding: '30px',
            borderRadius: '10px',
            marginBottom: '40px',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>🗓 {mes}</h2>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '18px', textDecoration: 'underline' }}>📑 Cotización de Servicios</h3>
              <p><strong>Cliente:</strong> {data.receptor}</p>
              <p><strong>Fecha:</strong> {data.fechasPorMes?.[mes]}</p>
              <p style={{ textAlign: 'justify', marginTop: '10px' }}>
                Por medio de la presente cotización, hacemos de su conocimiento que se le podrá brindar el servicio de <strong>{data.descripcionSAT}</strong> con base en el requerimiento solicitado por su parte para el mes de <strong>{mes}</strong>. El costo estimado del servicio es de <strong>${data.montosPorMes?.[mes]}</strong>. En caso de contratación de nuestros servicios, podrá consultar mayor detalle en el contrato correspondiente.
              </p>
              <p style={{ marginTop: '10px' }}>De antemano agradecemos su preferencia.</p>
              <p style={{ textAlign: 'center', marginTop: '30px' }}><em>DEPARTAMENTO DE VENTAS</em></p>
              <p style={{ textAlign: 'center' }}>{data.proveedor}</p>
            </div>

            <div>
              <h3 style={{ fontSize: '18px', textDecoration: 'underline' }}>✍️ Aceptación del Servicio</h3>
              <p>
                El suscrito representante legal de <strong>{data.receptor}</strong> acepta la cotización arriba descrita correspondiente al mes de <strong>{mes}</strong>, así como los términos y condiciones propuestos por el proveedor <strong>{data.proveedor}</strong>, por un monto total de <strong>${data.montosPorMes?.[mes]}</strong>.
              </p>
              <p style={{ marginTop: '20px' }}>Fecha de aceptación: {data.fechasPorMes?.[mes]}</p>
              <p style={{ marginTop: '30px', textAlign: 'center' }}>_______________________________</p>
              <p style={{ textAlign: 'center' }}>Firma del Representante Legal</p>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <button onClick={() => descargarPDF(mes)} style={{
                marginRight: '10px',
                padding: '10px 18px',
                backgroundColor: '#4ADE80',
                border: 'none',
                color: '#000',
                fontWeight: 'bold',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                Descargar PDF
              </button>
              <button style={{
                padding: '10px 18px',
                backgroundColor: '#60A5FA',
                border: 'none',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '8px',
                cursor: 'pointer'
              }} onClick={() => alert('📄 El formato editable (Word) tiene un costo adicional del 10%')}>
                Descargar Word
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}