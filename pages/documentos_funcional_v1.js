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

  return (
    <div style={{ backgroundColor: '#0d1117', color: '#e0e0e0', padding: '40px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>COTIZACIÓN DE SERVICIOS</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <div><strong>Cliente:</strong> {datos.receptor}</div>
        <div><strong>Fecha:</strong> {datos.fechaCFDI}</div>
      </div>

      <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>
        Con base en la solicitud recibida, nos permitimos cotizar los siguientes servicios correspondientes a la clave SAT {datos.codigoSAT}:
        <br /><br />
        {datos.descripcionSAT}. Este servicio incluye: {datos.descripcionCFDI}.
      </p>

      <h3 style={{ marginTop: '30px' }}>Desglose por mes</h3>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', marginTop: '10px', width: '100%' }}>
        <thead style={{ backgroundColor: '#161b22' }}>
          <tr>
            <th>Mes</th>
            <th>Fecha</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {datos.mesesSeleccionados.map((mes) => (
            <tr key={mes}>
              <td>{mes}</td>
              <td>{datos.fechasPorMes[mes]}</td>
              <td>${parseFloat(datos.montosPorMes[mes]).toLocaleString('es-MX')}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2"><strong>Total</strong></td>
            <td><strong>${total.toLocaleString('es-MX')}</strong></td>
          </tr>
        </tfoot>
      </table>

      <h3 style={{ marginTop: '30px' }}>Importe en letra</h3>
      <p><em>{totalEnLetra}</em></p>

      <h3 style={{ marginTop: '40px' }}>Términos y condiciones</h3>
      <ul style={{ lineHeight: '1.6', paddingLeft: '20px' }}>
        <li>Precios en moneda nacional.</li>
        <li>No incluyen IVA.</li>
        <li>Sujeto a verificación y autorización.</li>
        <li>Documento válido por 30 días.</li>
      </ul>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <p><strong>Departamento Comercial</strong><br />Triada Empresarial</p>
      </div>
    </div>
  );
}
