
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
          <div key={mes} style={{ marginBottom: '60px', borderBottom: '1px solid #374151', paddingBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>🗓 {mes}</h2>

            {/* COTIZACIÓN - FORMATO FINAL */}
            <div id={`cotizacion-${mes}`} style={{ backgroundColor: '#FFFFFF', color: '#000', padding: '40px', borderRadius: '8px' }}>
              <h2 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '20px' }}>
                COTIZACIÓN DE SERVICIOS
              </h2>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <p><strong>Cliente:</strong> {data.receptor}</p>
                <p><strong>Fecha:</strong> {data.fechasPorMes?.[mes]}</p>
              </div>

              <p style={{ textAlign: 'justify', marginBottom: '15px' }}>
                Por medio de la presente cotización, hacemos de su conocimiento que se le podrá brindar el servicio de <strong>{data.descripcionSAT}</strong>,
                con base en el requerimiento solicitado por su parte correspondiente al mes de <strong>{mes}</strong>.
              </p>
              <p style={{ textAlign: 'justify', marginBottom: '15px' }}>
                Este servicio contempla la generación de evidencia documental para fines de soporte técnico y administrativo, mismo que podrá ser validado
                mediante el análisis posterior correspondiente.
              </p>
              <p style={{ textAlign: 'justify', marginBottom: '15px' }}>
                En el caso de contratación de nuestros servicios y para mayor detalle de estos, podrá consultar la información contenida en el contrato correspondiente.
              </p>

              <table style={{ width: '100%', marginTop: '20px', marginBottom: '30px', border: '1px solid #000', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '10px', border: '1px solid #000', backgroundColor: '#E5E7EB' }}>CONCEPTO</th>
                    <th style={{ padding: '10px', border: '1px solid #000', backgroundColor: '#E5E7EB' }}>IMPORTE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '10px', border: '1px solid #000' }}>{data.descripcionSAT}</td>
                    <td style={{ padding: '10px', border: '1px solid #000' }}>${data.montosPorMes?.[mes]}</td>
                  </tr>
                </tbody>
              </table>

              <h4 style={{ marginBottom: '10px' }}>TÉRMINOS Y CONDICIONES</h4>
              <ul style={{ fontSize: '14px', paddingLeft: '20px' }}>
                <li>Esta cotización es válida por 5 días hábiles a partir de la fecha de emisión.</li>
                <li>Los precios están sujetos a cambios sin previo aviso.</li>
                <li>La contratación del servicio estará sujeta a disponibilidad y a la firma del contrato correspondiente.</li>
              </ul>

              <p style={{ marginTop: '30px', textAlign: 'justify' }}>
                De antemano agradecemos el interés mostrado por nuestros servicios y su preferencia.
                Quedamos a su entera disposición para cualquier duda, comentario y/o aclaración.
              </p>

              <div style={{ marginTop: '60px', textAlign: 'center' }}>
                <p><strong>ÁREA COMERCIAL</strong></p>
                <p>{data.proveedor}</p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '15px', marginBottom: '40px' }}>
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
              <button
                onClick={() => alert("📄 El formato editable (Word) tiene un costo adicional del 10%.")}
                style={{
                  backgroundColor: '#60A5FA',
                  color: '#fff',
                  fontWeight: 'bold',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  marginTop: '10px',
                  cursor: 'pointer'
                }}>
                Descargar Word (Editable)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
