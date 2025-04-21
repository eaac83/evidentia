
import { useEffect, useState } from "react";

export default function Documentos() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("formularioDatos"));
    setData(stored);
  }, []);

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

            {/* COTIZACIÓN */}
            <div style={{ backgroundColor: '#fff', color: '#000', padding: '50px', fontFamily: 'Arial', borderRadius: '8px' }}>
              <h2 style={{ textAlign: 'center', textTransform: 'uppercase', marginBottom: '40px' }}>COTIZACIÓN DE SERVICIOS</h2>

              <p style={{ marginBottom: '10px' }}><strong>{data.receptor}</strong></p>
              <p style={{ textAlign: 'right', marginBottom: '30px' }}>{data.fechasPorMes?.[mes]}</p>

              <p style={{ textAlign: 'justify', marginBottom: '15px' }}>
                Reciba un cordial saludo y nuestro agradecimiento por el interés mostrado en nuestros servicios.
              </p>
              <p style={{ textAlign: 'justify', marginBottom: '15px' }}>
                Derivado de las conversaciones sostenidas con su equipo de trabajo y con el objetivo de fortalecer la relación comercial que mantenemos con <strong>{data.receptor}</strong>, nos permitimos remitirle la siguiente propuesta de cotización:
              </p>

              <h4 style={{ marginTop: '30px' }}>Descripción del Servicio</h4>
              <p><strong>{data.descripcionSAT}</strong></p>
              <p style={{ textAlign: 'justify', marginBottom: '15px' }}>
                Este servicio contempla, de forma enunciativa mas no limitativa, las actividades, procesos y entregables inherentes al cumplimiento del concepto antes mencionado. Su alcance y aplicación estarán sujetos a las condiciones específicas pactadas entre el proveedor y el cliente, mismas que se detallan en el contrato correspondiente o en documentos complementarios derivados de esta propuesta.
              </p>

              <h4 style={{ marginTop: '30px' }}>Condiciones de Contratación</h4>
              <p style={{ textAlign: 'justify', marginBottom: '15px' }}>
                En caso de aceptar esta propuesta, le informamos que podrá consultar el detalle completo de los servicios ofrecidos en el contrato correspondiente, el cual rige las condiciones de prestación.
              </p>

              <h4 style={{ marginTop: '30px' }}>Costo del Servicio</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #000', padding: '8px', background: '#f3f3f3' }}>CONCEPTO</th>
                    <th style={{ border: '1px solid #000', padding: '8px', background: '#f3f3f3' }}>IMPORTE (MXN)</th>
                    <th style={{ border: '1px solid #000', padding: '8px', background: '#f3f3f3' }}>IMPORTE EN LETRA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '8px' }}>{data.descripcionSAT}</td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}>${data.montosPorMes?.[mes]?.toLocaleString("es-MX")}</td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}>{data.montosEnLetra?.[mes]}</td>
                  </tr>
                </tbody>
              </table>

              <h4 style={{ marginTop: '30px' }}>Términos y Condiciones</h4>
              <ul style={{ marginLeft: '20px' }}>
                <li>Todos los precios están expresados en moneda nacional (MXN).</li>
                <li>Los importes presentados son estimados. El valor final podrá ajustarse conforme a lo prestado y se reflejará en el CFDI correspondiente.</li>
                <li>Los precios no incluyen IVA.</li>
                <li>Cualquier servicio adicional solicitado implicará un costo adicional.</li>
                <li>Los precios están sujetos a cambio sin previo aviso por escrito.</li>
                <li>Los gastos extraordinarios (como viáticos, materiales o traslados) no están incluidos, y serán notificados en caso de ser necesarios.</li>
                <li>Esta cotización tiene una vigencia de 30 días naturales a partir de la fecha de emisión.</li>
              </ul>

              <p style={{ textAlign: 'justify', marginTop: '30px' }}>
                Agradecemos nuevamente la confianza depositada en nosotros y quedamos atentos para resolver cualquier duda o comentario respecto a esta propuesta.
              </p>

              <div style={{ marginTop: '60px', textAlign: 'center' }}>
                <p><strong>ÁREA COMERCIAL</strong></p>
                <p>{data.proveedor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
