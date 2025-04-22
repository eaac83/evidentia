
import { useState } from 'react';
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
  const razonSocial = 'JAR Soluciones Industriales';
  const fecha = '5 de febrero de 2025';
  const descripcionSAT = 'Servicios de capacitación en seguridad';
  const monto = 1250500;
  const importeEnLetra = numeroALetras(monto);

  const [aceptado, setAceptado] = useState(false);

  const handleDescargarPDF = () => {
    const doc = new jsPDF();
    doc.text(`Cotización de servicios para ${razonSocial}`, 10, 10);
    doc.text(`Fecha: ${fecha}`, 10, 20);
    doc.text(`Descripción: ${descripcionSAT}`, 10, 30);
    doc.text(`Monto: $${monto.toLocaleString('es-MX')} (${importeEnLetra})`, 10, 40);
    doc.save('cotizacion.pdf');
  };

  const handleDescargarEditable = () => {
    alert(`El archivo editable tiene un costo adicional del 10% sobre el valor de la cotización.\nMonto adicional: $${(monto * 0.1).toLocaleString('es-MX')} MXN.\n\nEste archivo no se entrega de manera automática.\nPor favor contáctenos para gestionar este servicio adicional.`);
  };

  return (
    <div style={{ backgroundColor: '#0d1117', color: '#e0e0e0', padding: '40px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>COTIZACIÓN DE SERVICIOS PARA CLIENTE</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <div><strong>Cliente:</strong> {razonSocial}</div>
        <div><strong>{fecha}</strong></div>
      </div>

      <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>
        Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios.
        Con base en las diferentes pláticas sostenidas con personal de su empresa y a efecto de continuar con la relación que hemos desarrollado con {razonSocial},
        nos permitimos hacerle llegar la cotización de los siguientes servicios:
        <br /><br />
        {descripcionSAT}, mismo que consiste de manera enunciativa más no limitativa en el estudio mediante la proyección y evaluación de estados financieros y
        bitácora de seguimiento para la determinación del valor de inversión necesario para la obtención de un bien producido. Asimismo, incluye la administración
        de los estados financieros conforme a prácticas de control interno.
        <br /><br />
        En el caso de contratación de nuestros servicios y para mayor detalle de estos, podrá consultar la información contenida en el contrato correspondiente.
      </p>

      <h3 style={{ marginTop: '40px' }}>Costo del Servicio</h3>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', marginTop: '10px', width: '100%' }}>
        <thead style={{ backgroundColor: '#161b22' }}>
          <tr>
            <th>CONCEPTO</th>
            <th>IMPORTE (MXN)</th>
            <th>IMPORTE EN LETRA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{descripcionSAT}</td>
            <td>${monto.toLocaleString('es-MX')}</td>
            <td>{importeEnLetra}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: '40px' }}>Términos y Condiciones</h3>
      <ul style={{ lineHeight: '1.6', paddingLeft: '20px' }}>
        <li>Nuestros costos se manejan en moneda nacional.</li>
        <li>Los costos reflejados son un valor estimado del final derivado de la prestación del servicio, y pueden variar.</li>
        <li>Los costos descritos no incluyen IVA.</li>
        <li>Servicios adicionales tienen un costo adicional.</li>
        <li>Los precios pueden cambiar sin previo aviso.</li>
        <li>Gastos extraordinarios no están incluidos y serán notificados en caso necesario.</li>
        <li>La presente cotización tiene vigencia de 30 días a partir de su emisión.</li>
      </ul>

      <p style={{ marginTop: '40px', textAlign: 'justify' }}>
        De antemano agradecemos el interés mostrado por nuestros servicios y agradecemos su preferencia.
        Quedamos a su entera disposición para cualquier duda, comentario y/o aclaración.
      </p>

      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <div><strong>DEPARTAMENTO COMERCIAL</strong></div>
        <div><strong>Jesús Alonso Reynoso</strong></div>
      </div>

      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <label style={{ display: 'block', marginBottom: '20px' }}>
          <input
            type="checkbox"
            checked={aceptado}
            onChange={(e) => setAceptado(e.target.checked)}
            style={{ marginRight: '10px' }}
          />
          Acepto los términos y condiciones de esta cotización.
        </label>

        <button
          onClick={handleDescargarPDF}
          disabled={!aceptado}
          style={{
            backgroundColor: aceptado ? '#2563eb' : '#4b5563',
            color: 'white',
            padding: '10px 20px',
            marginRight: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: aceptado ? 'pointer' : 'not-allowed',
          }}
        >
          Descargar PDF
        </button>

        <button
          onClick={handleDescargarEditable}
          disabled={!aceptado}
          style={{
            backgroundColor: aceptado ? '#10b981' : '#4b5563',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: aceptado ? 'pointer' : 'not-allowed',
          }}
        >
          Descargar Editable
        </button>
      </div>
    </div>
  );
}
