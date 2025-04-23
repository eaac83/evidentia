import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

function numeroALetras(num) {
  const unidades = ['','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'];
  const decenas = ['','diez','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
  const centenas = ['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];
  const especiales = ['diez','once','doce','trece','catorce','quince'];

  function convertirGrupo(n) {
    let salida = '';
    if (n === '100') return 'cien';
    if (n[0] !== '0') salida += centenas[parseInt(n[0])] + ' ';
    const d = parseInt(n.substring(1));
    if (d <= 9) salida += unidades[d];
    else if (d <= 15) salida += especiales[d - 10];
    else {
      salida += decenas[parseInt(n[1])];
      if (n[2] !== '0') salida += ' y ' + unidades[parseInt(n[2])];
    }
    return salida.trim();
  }

  function convertirNumero(numero) {
    const padded = numero.toString().padStart(9, '0');
    const millones = padded.substring(0, 3);
    const miles = padded.substring(3, 6);
    const cientos = padded.substring(6, 9);

    let letras = '';

    if (parseInt(millones) > 0) {
      letras += (millones === '001') ? 'un millón ' : convertirGrupo(millones) + ' millones ';
    }

    if (parseInt(miles) > 0) {
      letras += (miles === '001') ? 'mil ' : convertirGrupo(miles) + ' mil ';
    }

    if (parseInt(cientos) > 0) {
      letras += convertirGrupo(cientos);
    }

    return letras.trim();
  }

  num = parseFloat(num).toFixed(2);
  const partes = num.split('.');
  const entero = parseInt(partes[0]);
  const centavos = partes[1];

  if (entero === 0) return `Cero pesos ${centavos}/100 M.N.`;

  const letras = convertirNumero(entero);
  return letras.charAt(0).toUpperCase() + letras.slice(1) + ` pesos ${centavos}/100 M.N.`;
}

export default function Documentos() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("formularioDatos"));
    setDatos(stored);
  }, []);

  if (!datos) return <div style={{ padding: '40px', color: 'white' }}>Cargando información...</div>;

  const calcularTotal = () => {
    return Object.values(datos.montosPorMes || {}).reduce((acc, val) => acc + parseFloat(val || 0), 0);
  };

  const total = calcularTotal();
  const totalEnLetra = numeroALetras(total);
  const fechaBase = new Date(datos.fechaCFDI);
  const fechaCotizacion = new Date(fechaBase);
  let dias = 0, cont = 0;
  while (dias < 7) {
    fechaBase.setDate(fechaBase.getDate() - 1);
    if (fechaBase.getDay() !== 0 && fechaBase.getDay() !== 6) dias++;
  }
  while (cont < 15) {
    fechaCotizacion.setDate(fechaCotizacion.getDate() - 1);
    if (fechaCotizacion.getDay() !== 0 && fechaCotizacion.getDay() !== 6) cont++;
  }

  const formatFecha = (fecha) => fecha.toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: '2-digit'
  });

  return (
    <div style={{ backgroundColor: '#0d1117', color: '#e0e0e0', padding: '40px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>COTIZACIÓN DE SERVICIOS</h2>

      <div style={{ marginTop: '40px' }}><strong>Cliente:</strong> {datos.receptor}</div>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}><strong>Fecha de emisión:</strong> {formatFecha(fechaCotizacion)}</div>

      <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>
        Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios. Con base en las diferentes pláticas sostenidas con personal de su empresa y a efecto de continuar con la relación que hemos desarrollado con {datos.receptor}, nos permitimos hacerle llegar la cotización de los siguientes servicios:
      </p>

      <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>
        {datos.descripcionCFDI}, mismo que consiste de manera enunciativa más no limitativa en el estudio mediante la proyección y evaluación de estados financieros y bitácora de seguimiento para la determinación del valor de inversión necesario para la obtención de un bien producido. Administración de los estados financieros.
      </p>

      <h3 style={{ marginTop: '30px' }}>COSTO</h3>
      <p><strong>{datos.descripcionCFDI}</strong></p>
      <p><strong>Total:</strong> ${total.toLocaleString('es-MX')}</p>
      <p><strong>En letra:</strong> {totalEnLetra}</p>

      <p style={{ textAlign: 'justify', marginTop: '40px' }}>
        Para brindarles un mejor servicio, les solicitamos de la manera más atenta que se tome un tiempo para leer nuestros <strong>TÉRMINOS Y CONDICIONES</strong>, mismos que les incluimos a continuación:
      </p>
      <ul style={{ lineHeight: '1.6', paddingLeft: '20px' }}>
        <li>Nuestros costos se manejan en moneda nacional.</li>
        <li>Los costos reflejados en el presente documento son un valor estimado del final derivado de la prestación de nuestro servicio, mismo que se reflejará en el CFDI correspondiente, pudiendo presentar variables del mostrado en el presente documento.</li>
        <li>Los costos descritos no incluyen IVA.</li>
        <li>Cualquier SERVICIO adicional que alguno de nuestros especialistas realice tendrá un costo adicional al ya mencionado.</li>
        <li>Nuestros costos son susceptibles de cambio sin previo aviso por escrito hacia nuestros clientes.</li>
        <li>Los gastos extraordinarios que se podrían originar de la prestación de los servicios mencionados tales como viáticos, etc., no se encuentran incluidos en la cantidad mencionada con anterioridad. En caso correspondiente, personal de nuestra empresa se pondrá en contacto con usted para notificarle dichos gastos.</li>
        <li>La presente cotización de servicio tendrá vigencia de 30 días a partir de la expedición del documento.</li>
      </ul>

      <p style={{ textAlign: 'justify', marginTop: '40px' }}>
        Agradecemos profundamente el interés mostrado por nuestros servicios y su confianza en nuestra empresa. Quedamos a su entera disposición para cualquier duda, comentario y/o aclaración.
      </p>

      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <div><strong>DEPARTAMENTO DE VENTAS</strong></div>
        <div>Área responsable de brindar atención, seguimiento y formalización de solicitudes de servicios.</div>
        <div style={{ marginTop: '40px', borderTop: '1px solid #888', width: '60%', marginLeft: 'auto', marginRight: 'auto', paddingTop: '10px' }}>
          <strong>{datos.proveedor}</strong>
        </div>
      </div>
    </div>
  );
}
