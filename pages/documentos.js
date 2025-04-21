
import { useEffect, useState } from "react";

// Función para convertir número a texto (versión corta)
function numeroALetras(num) {
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });
  const letras = {
    0: "cero", 1: "uno", 2: "dos", 3: "tres", 4: "cuatro", 5: "cinco",
    6: "seis", 7: "siete", 8: "ocho", 9: "nueve"
  };
  if (typeof num !== "number") return "";
  return formatter.format(num) + " M.N.";
}

export default function Documentos() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("formularioDatos"));
    setData(stored);
  }, []);

  const formatoFecha = (fechaISO) => {
    if (!fechaISO) return '';
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-MX", { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const etiquetasFinales = [
    "DEPARTAMENTO DE VENTAS",
    "COORDINACIÓN COMERCIAL",
    "ÁREA DE ATENCIÓN EMPRESARIAL",
    "UNIDAD DE NEGOCIOS",
    "DIVISIÓN DE SERVICIOS",
    "GESTIÓN COMERCIAL"
  ];

  const generarNarrativaServicio = (descripcion) => {
    return `${descripcion}, mismo que consiste, de forma enunciativa más no limitativa, en llevar a cabo las actividades, procesos y entregables necesarios para garantizar la correcta ejecución del servicio descrito. Asimismo, incluye las acciones y controles administrativos necesarios para su cumplimiento conforme a las mejores prácticas de operación.`;
  };

  function etiquetaRandom() {
    return etiquetasFinales[Math.floor(Math.random() * etiquetasFinales.length)];
  }

  if (!data) return <p style={{ color: 'white', padding: 40 }}>Cargando datos...</p>;

  return (
    <div style={{ backgroundColor: '#0D1117', minHeight: '100vh', color: 'white', padding: '40px' }}>
      <div style={{ maxWidth: '900px', margin: 'auto' }}>
        <h1 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '30px' }}>
          📂 Documentos por Mes
        </h1>

        {data.mesesSeleccionados.map((mes) => {
          const monto = Number(data.montosPorMes?.[mes] || 0);
          const montoFormateado = monto.toLocaleString("es-MX", { minimumFractionDigits: 2 });
          const montoLetra = data.montosEnLetra?.[mes] || numeroALetras(monto);

          return (
            <div key={mes} style={{ backgroundColor: '#fff', color: '#000', padding: '50px', borderRadius: '8px', marginBottom: '60px' }}>
              <h2 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '30px' }}>
                COTIZACIÓN DE SERVICIOS PARA CLIENTE
              </h2>

              <p style={{ fontWeight: 'bold' }}>Cliente: {data.receptor}</p>
              <p style={{ textAlign: 'right', marginBottom: '20px' }}>{formatoFecha(data.fechasPorMes?.[mes])}</p>

              <p style={{ textAlign: 'justify', marginBottom: '15px' }}>
                Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios. 
                Con base en las diferentes pláticas sostenidas con personal de su empresa y a efecto de continuar con la relación que hemos desarrollado con <strong>{data.receptor}</strong>, 
                nos permitimos hacerle llegar la cotización de los siguientes servicios:
              </p>

              <p style={{ textAlign: 'justify', marginBottom: '15px' }}>
                {generarNarrativaServicio(data.descripcionSAT)}
              </p>

              <p style={{ textAlign: 'justify', marginBottom: '15px' }}>
                En el caso de contratación de nuestros servicios y para mayor detalle de estos podrá consultar la información contenida en el contrato correspondiente.
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
                    <td style={{ border: '1px solid #000', padding: '8px' }}>${montoFormateado}</td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}>{montoLetra}</td>
                  </tr>
                </tbody>
              </table>

              <h4 style={{ marginTop: '30px' }}>TÉRMINOS Y CONDICIONES</h4>
              <ul style={{ marginLeft: '20px' }}>
                <li>Nuestros costos se manejan en moneda nacional.</li>
                <li>Los costos reflejados en el presente documento son un valor estimado del final derivado de la prestación de nuestro servicio, mismo que se reflejará en la CFDI correspondiente, pudiendo presentar variables del mostrado en el presente documento.</li>
                <li>Los costos descritos no incluyen IVA.</li>
                <li>Cualquier SERVICIO adicional que alguno de nuestros especialistas realice tendrá un costo adicional al ya mencionado.</li>
                <li>Nuestros costos son susceptibles de cambio sin previo aviso por escrito hacia nuestros clientes.</li>
                <li>Los gastos extraordinarios que se podrían originar de la prestación de los servicios mencionados tales como viáticos, materiales o traslados, no se encuentran incluidos en la cantidad mencionada con anterioridad. En caso de generarse, personal de nuestra empresa se pondrá en contacto con usted para notificarle dichos gastos.</li>
                <li>La presente cotización de servicio tendrá vigencia de 30 días a partir de la expedición del documento.</li>
              </ul>

              <p style={{ textAlign: 'justify', marginTop: '30px' }}>
                De antemano agradecemos el interés mostrado por nuestros servicios y agradecemos su preferencia. 
                Quedamos a su entera disposición para cualquier duda, comentario y/o aclaración.
              </p>

              <div style={{ marginTop: '60px', textAlign: 'center' }}>
                <p><strong>{etiquetaRandom()}</strong></p>
                <p>{data.proveedor}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
