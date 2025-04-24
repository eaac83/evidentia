import { useEffect, useState } from "react";
import jsPDF from "jspdf";

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

  const partes = parseFloat(num).toFixed(2).split('.');
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

  const generarPDF = () => {
    const doc = new jsPDF();
    const margin = 15;
    const lineHeight = 8;
    let y = margin;

    const total = Object.values(datos?.montosPorMes || {}).reduce((acc, val) => acc + parseFloat(val || 0), 0);
    const totalEnLetra = numeroALetras(total);
    const fecha = new Date(datos.fechaCFDI);
    const fechaTexto = fecha.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

    doc.setFontSize(14);
    doc.text("COTIZACIÓN DE SERVICIOS", 105, y, { align: "center" });
    y += 2 * lineHeight;

    doc.setFontSize(11);
    doc.text(`Cliente: ${datos.receptor}`, margin, y);
    doc.text(`Fecha de emisión: ${fechaTexto}`, 200 - margin, y, { align: "right" });
    y += 2 * lineHeight;

    const parrafos = [
      `Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios. Con base en las diferentes pláticas sostenidas con personal de su empresa y a efecto de continuar con la relación que hemos desarrollado con ${datos.receptor}, nos permitimos hacerle llegar la cotización de los siguientes servicios:`,
      `${datos.descripcionCFDI}, mismo que consiste de manera enunciativa más no limitativa en el estudio mediante la proyección y evaluación de estados financieros y bitácora de seguimiento para la determinación del valor de inversión necesario para la obtención de un bien producido.`
    ];

    parrafos.forEach(p => {
      const lines = doc.splitTextToSize(p, 180);
      doc.text(lines, margin, y);
      y += lines.length * lineHeight;
    });

    y += lineHeight;
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text("COSTO", 105, y, { align: "center" }); y += lineHeight;
    doc.setFont(undefined, "normal");
    doc.text(`${datos.descripcionCFDI}`, 105, y, { align: "center" }); y += lineHeight;
    doc.text(`$${total.toLocaleString("es-MX")}`, 105, y, { align: "center" }); y += lineHeight;
    doc.text(`${totalEnLetra}`, 105, y, { align: "center" }); y += 2 * lineHeight;

    const terminos = [
      "Nuestros costos se manejan en moneda nacional.",
      "Los costos reflejados en el presente documento son un valor estimado del final derivado de la prestación de nuestro servicio.",
      "Los costos descritos no incluyen IVA.",
      "Cualquier servicio adicional tendrá un costo extra.",
      "Los precios pueden cambiar sin previo aviso.",
      "Gastos extraordinarios como viáticos no están incluidos.",
      "La presente cotización tiene vigencia de 30 días."
    ];

    doc.setFontSize(11);
    doc.text("TÉRMINOS Y CONDICIONES:", margin, y); y += lineHeight;
    terminos.forEach(t => {
      const lines = doc.splitTextToSize(`- ${t}`, 180);
      doc.text(lines, margin, y);
      y += lines.length * lineHeight;
    });

    y += 3 * lineHeight;
    doc.setFont(undefined, "bold");
    doc.text("DEPARTAMENTO DE VENTAS", 105, y, { align: "center" }); y += lineHeight;
    doc.setFont(undefined, "normal");
    doc.text(datos.proveedor, 105, y, { align: "center" });

    doc.save("cotizacion.pdf");
  };

  if (!datos) return <div style={{ padding: 40 }}>Cargando datos...</div>;

  const total = Object.values(datos?.montosPorMes || {}).reduce((acc, val) => acc + parseFloat(val || 0), 0);
  const totalEnLetra = numeroALetras(total);
  const fecha = new Date(datos.fechaCFDI);
  const fechaTexto = fecha.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  return (
    <div style={{ padding: 40 }}>
      <h2 style={{ textAlign: "center" }}>Vista previa del documento</h2>

      <div style={{ backgroundColor: "#f3f4f6", padding: 20, borderRadius: 8, maxWidth: 800, margin: "auto" }}>
        <h3 style={{ textAlign: "center" }}>COTIZACIÓN DE SERVICIOS</h3>
        <p><strong>Cliente:</strong> {datos.receptor}</p>
        <p style={{ textAlign: "right" }}><strong>Fecha de emisión:</strong> {fechaTexto}</p>

        <p style={{ textAlign: "justify" }}>
          Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios.
          Con base en las diferentes pláticas sostenidas con personal de su empresa y a efecto de continuar con la relación que hemos desarrollado con {datos.receptor}, nos permitimos hacerle llegar la cotización de los siguientes servicios:
        </p>

        <p style={{ textAlign: "justify" }}>
          {datos.descripcionCFDI}, mismo que consiste de manera enunciativa más no limitativa en el estudio mediante la proyección y evaluación de estados financieros y bitácora de seguimiento para la determinación del valor de inversión necesario para la obtención de un bien producido.
        </p>

        <h4 style={{ textAlign: "center" }}>COSTO</h4>
        <p style={{ textAlign: "center" }}>
          {datos.descripcionCFDI}<br />
          <strong>${total.toLocaleString("es-MX")}</strong><br />
          <em>{totalEnLetra}</em>
        </p>

        <h4>TÉRMINOS Y CONDICIONES:</h4>
        <ul>
          <li>Nuestros costos se manejan en moneda nacional.</li>
          <li>Los costos reflejados son estimados.</li>
          <li>Los costos descritos no incluyen IVA.</li>
          <li>Cualquier servicio adicional tendrá un costo extra.</li>
          <li>Los precios pueden cambiar sin previo aviso.</li>
          <li>Gastos extraordinarios como viáticos no están incluidos.</li>
          <li>Vigencia de 30 días.</li>
        </ul>

        <p style={{ textAlign: "center", marginTop: 30 }}>
          <strong>DEPARTAMENTO DE VENTAS</strong><br />
          {datos.proveedor}
        </p>
      </div>

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <button onClick={generarPDF} style={{ backgroundColor: "#10b981", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>
          Descargar PDF
        </button>
      </div>
    </div>
  );
}