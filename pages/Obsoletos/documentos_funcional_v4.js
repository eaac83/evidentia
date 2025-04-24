import { useEffect, useState } from "react";

// Función definitiva para convertir números a letras
function numeroALetras(num) {
  const unidades = ['','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'];
  const decenas = ['','diez','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
  const centenas = ['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];

  function convertirGrupo(n) {
    let salida = '';
    if (n === 100) return 'cien';
    if (n > 99) salida += centenas[Math.floor(n / 100)] + ' ';
    n = n % 100;
    if (n > 29) {
      salida += decenas[Math.floor(n / 10)];
      if (n % 10) salida += ' y ' + unidades[n % 10];
    } else if (n > 20) {
      salida += 'veinti' + unidades[n % 10];
    } else if (n >= 10) {
      const especiales = ['diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte'];
      salida += especiales[n - 10];
    } else if (n > 0) {
      salida += unidades[n];
    }
    return salida.trim();
  }

  let entero = Math.floor(num);
  let centavos = Math.round((num - entero) * 100);
  let miles = Math.floor(entero / 1000);
  let resto = entero % 1000;
  let texto = '';
  if (miles > 0) texto += convertirGrupo(miles) + ' mil ';
  texto += convertirGrupo(resto);
  texto = texto.trim();
  texto = texto.charAt(0).toUpperCase() + texto.slice(1);
  if (!texto) texto = 'Cero';
  return `${texto} pesos ${centavos.toString().padStart(2, '0')}/100 M.N.`;
}


import jsPDF from "jspdf";

const generarPDFCompleto = (datos) => {
  const doc = new jsPDF();
  const lineHeight = 10;
  const margin = 15;
  let y = margin;

  doc.setFontSize(14);
  doc.text("COTIZACIÓN DE SERVICIOS", 105, y, { align: "center" });
  y += lineHeight * 2;

  doc.setFontSize(11);
  doc.text(`Cliente: ${datos.receptor}`, margin, y); y += lineHeight;
  doc.text(`Fecha de emisión: ${datos.fechaCFDI}`, margin, y); y += lineHeight;

  const textoCotizacion = [
    `Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios.`,
    `Con base en las diferentes pláticas sostenidas con personal de su empresa y a efecto de continuar con la relación que hemos desarrollado con ${datos.receptor}, nos permitimos hacerle llegar la cotización de los siguientes servicios:`,
    ``,
    `${datos.descripcionCFDI}, mismo que consiste de manera enunciativa más no limitativa en el estudio mediante la proyección y evaluación de estados financieros y bitácora de seguimiento para la determinación del valor de inversión necesario para la obtención de un bien producido.`,
    ``,
    `Monto total estimado: $${Object.values(datos.montosPorMes || {}).reduce((acc, v) => acc + parseFloat(v), 0).toFixed(2)}`,
    ``,
    `TÉRMINOS Y CONDICIONES:`,
    `- Nuestros costos se manejan en moneda nacional.`,
    `- Los costos descritos no incluyen IVA.`,
    `- Cualquier servicio adicional tendrá un costo extra.`,
    `- Esta cotización tiene vigencia de 30 días.`,
  ];

  textoCotizacion.forEach(p => {
    const lines = doc.splitTextToSize(p, 180);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight;
  });

  y += lineHeight;
  doc.text("DEPARTAMENTO DE VENTAS", margin, y); y += lineHeight;
  doc.text(datos.proveedor, margin, y); y += lineHeight;

  doc.addPage();
  y = margin;
  doc.setFontSize(14);
  doc.text("ACEPTACIÓN DEL SERVICIO", 105, y, { align: "center" });
  y += lineHeight * 2;

  doc.setFontSize(11);
  const textoAceptacion = [
    `El suscrito representante legal de ${datos.receptor} acepta la cotización arriba descrita correspondiente a los meses indicados, así como los términos y condiciones propuestos por el proveedor ${datos.proveedor}, por un monto total estimado de $${Object.values(datos.montosPorMes || {}).reduce((acc, v) => acc + parseFloat(v), 0).toFixed(2)}.`,
    ``,
    `Fecha de aceptación: ${datos.fechaCFDI}`
  ];

  textoAceptacion.forEach(p => {
    const lines = doc.splitTextToSize(p, 180);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight;
  });

  y += lineHeight * 2;
  doc.text("______________________________", 105, y, { align: "center" }); y += lineHeight;
  doc.text("Firma del Representante Legal", 105, y, { align: "center" });

  doc.save("documento_completo.pdf");
};




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
                    <td style={{ border: '1px solid #000', padding: '8px' }}>{numeroALetras(monto)}</td>
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


const generarWordEditable = (datos) => {
  const contenido = 
    "COTIZACIÓN DE SERVICIOS\n\n" +
    "Cliente: " + datos.receptor + "\n" +
    "Fecha de emisión: " + datos.fechaCFDI + "\n\n" +
    datos.descripcionCFDI + "\n\n" +
    "Monto total estimado: $" + Object.values(datos.montosPorMes || {}).reduce((acc, v) => acc + parseFloat(v), 0).toFixed(2) + "\n\n" +
    "TÉRMINOS Y CONDICIONES:\n" +
    "- Nuestros costos se manejan en moneda nacional.\n" +
    "- Los costos descritos no incluyen IVA.\n" +
    "- Esta cotización tiene vigencia de 30 días.\n\n" +
    "DEPARTAMENTO DE VENTAS\n" +
    datos.proveedor + "\n\n" +
    "--------------------------------------------------------\n\n" +
    "ACEPTACIÓN DEL SERVICIO\n\n" +
    "El suscrito representante legal de " + datos.receptor + 
    " acepta la cotización correspondiente a los meses indicados, así como los términos y condiciones propuestos por el proveedor " +
    datos.proveedor + ", por un monto total estimado de $" +
    Object.values(datos.montosPorMes || {}).reduce((acc, v) => acc + parseFloat(v), 0).toFixed(2) + ".\n\n" +
    "Fecha de aceptación: " + datos.fechaCFDI + "\n\n" +
    "Firma del Representante Legal";

  const blob = new Blob([contenido], { type: "application/msword" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "documento_completo.doc";
  a.click();
  window.URL.revokeObjectURL(url);
};
