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
  const [ventaFinalizada, setVentaFinalizada] = useState(false);
  const [cargoExtraAceptado, setCargoExtraAceptado] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("formularioDatos"));
    setDatos(stored);
  }, []);

  const calcularTotal = () => {
    return Object.values(datos?.montosPorMes || {}).reduce((acc, val) => acc + parseFloat(val || 0), 0);
  };

  const total = calcularTotal();
  const totalEnLetra = numeroALetras(total);
  const precioBase = 500;
  const precioIVA = precioBase * 0.16;
  const totalServicio = precioBase + precioIVA;
  const cargoEditable = totalServicio * 0.1;

  const handleDescargarPDF = () => {
    if (!ventaFinalizada) {
      alert("La descarga del PDF estará disponible una vez que se haya completado la venta del servicio.");
      return;
    }

    const doc = new jsPDF();
    doc.text(`Cotización para: ${datos.receptor}`, 10, 10);
    doc.text(`Descripción: ${datos.descripcionSAT}`, 10, 20);
    doc.text(`Total: $${total.toLocaleString('es-MX')} MXN`, 10, 30);
    doc.save("cotizacion.pdf");
  };

  const handleDescargarEditable = () => {
    if (!ventaFinalizada) {
      alert("Primero debe completarse la venta del servicio para acceder al archivo editable.");
      return;
    }

    const aceptar = window.confirm(
      `El archivo editable de esta cotización tiene un costo adicional del 10% sobre nuestro servicio base.\n\nMonto adicional: $${cargoEditable.toFixed(2)} MXN.\n\nEste cargo será incluido en su caja para proceder con la liberación del documento editable. ¿Desea continuar?`
    );

    if (aceptar) {
      setCargoExtraAceptado(true);
      alert("Se ha añadido el cargo adicional a su caja. El archivo editable será liberado tras confirmar el pago.");
    }
  };

  return (
    <div style={{ backgroundColor: '#0d1117', color: '#e0e0e0', padding: '40px' }}>
      <h2 style={{ textAlign: 'center' }}>COTIZACIÓN DE SERVICIOS</h2>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          onClick={() => setVentaFinalizada(true)}
          style={{
            marginBottom: '20px',
            backgroundColor: '#10b981',
            border: 'none',
            padding: '10px 20px',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Simular venta finalizada
        </button>
        <br />
        <button
          onClick={handleDescargarPDF}
          style={{
            marginRight: '10px',
            backgroundColor: ventaFinalizada ? '#2563eb' : '#4b5563',
            border: 'none',
            padding: '10px 20px',
            color: 'white',
            borderRadius: '5px',
            cursor: ventaFinalizada ? 'pointer' : 'not-allowed'
          }}
        >
          Descargar PDF
        </button>
        <button
          onClick={handleDescargarEditable}
          style={{
            backgroundColor: ventaFinalizada ? '#f59e0b' : '#4b5563',
            border: 'none',
            padding: '10px 20px',
            color: 'white',
            borderRadius: '5px',
            cursor: ventaFinalizada ? 'pointer' : 'not-allowed'
          }}
        >
          Descargar Editable
        </button>
      </div>
    </div>
  );
}