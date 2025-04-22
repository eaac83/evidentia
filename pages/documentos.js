
import jsPDF from 'jspdf';

function numeroALetras(num) {
  const unidades = ['','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'];
  const decenas = ['','diez','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
  const centenas = ['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];

  function convertirGrupo(n) {
    let salida = '';
    if (n === '100') return 'cien';
    if (n[0] !== '0') salida += centenas[parseInt(n[0])] + ' ';
    const d = parseInt(n.substring(1));
    if (d <= 9) salida += unidades[d];
    else if (d <= 15) {
      const especiales = ['diez','once','doce','trece','catorce','quince'];
      salida += especiales[d - 10];
    } else {
      salida += decenas[parseInt(n[1])];
      if (n[2] !== '0') salida += ' y ' + unidades[parseInt(n[2])];
    }
    return salida.trim();
  }

  function seccion(num, divisor, singular, plural) {
    const cientos = Math.floor(num / divisor);
    const resto = num - (cientos * divisor);
    let texto = '';
    if (cientos > 0)
      texto = (cientos === 1) ? singular : numeroALetras(cientos) + ' ' + plural;
    if (resto > 0)
      texto += ' ';
    return {texto, resto};
  }

  function miles(num) {
    const {texto, resto} = seccion(num, 1_000, 'mil', 'mil');
    return texto + numeroALetras(resto);
  }

  function millones(num) {
    const {texto, resto} = seccion(num, 1_000_000, 'un millón', 'millones');
    return texto + miles(resto);
  }

  num = parseFloat(num).toFixed(2);
  const partes = num.split('.');
  const entero = parseInt(partes[0]);
  const centavos = partes[1];

  if (entero === 0) return `Cero pesos ${centavos}/100 M.N.`;

  const letras = millones(entero).trim();
  return letras.charAt(0).toUpperCase() + letras.slice(1) + ` pesos ${centavos}/100 M.N.`;
}

export default function Documentos({ monto }) {
  const importeEnLetra = numeroALetras(monto || 0);

  return (
    <div style={{ backgroundColor: '#0d1117', color: '#e0e0e0', padding: '40px' }}>
      <h1 style={{ fontSize: '1.5rem' }}>Costo del Servicio</h1>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', marginTop: '20px', width: '100%' }}>
        <thead style={{ backgroundColor: '#161b22' }}>
          <tr>
            <th>CONCEPTO</th>
            <th>IMPORTE (MXN)</th>
            <th>IMPORTE EN LETRA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Servicios de capacitación en seguridad</td>
            <td>${parseFloat(monto).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
            <td>{importeEnLetra}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
