import { useEffect, useState } from "react";
import jsPDF from "jspdf";

// Función IA-Simulada integrada
function obtenerTextoSimuladoIA(descripcionSAT) {
  if (!descripcionSAT) return "";
  const desc = descripcionSAT.toLowerCase();
  if (desc.includes("limpieza") || desc.includes("mantenimiento"))
    return "El servicio incluye actividades de limpieza, conservación y mantenimiento preventivo de instalaciones físicas, garantizando condiciones óptimas de higiene y funcionamiento.";
  if (desc.includes("consultoría") || desc.includes("consultoria"))
    return "Se brinda asesoría estratégica enfocada en la mejora operativa y organizacional de las unidades administrativas involucradas.";
  if (desc.includes("suministro") || desc.includes("logística"))
    return "Se realiza un análisis logístico para mejorar el aprovisionamiento, almacenamiento y distribución de productos o servicios.";
  return "El servicio incluye actividades profesionales que cumplen con los objetivos técnicos y administrativos definidos entre las partes.";
}

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

    const textoIA = obtenerTextoSimuladoIA(datos.descripcionSAT);

    doc.setFontSize(14);
    doc.text("COTIZACIÓN DE SERVICIOS", 105, y, { align: "center" }); y += 2 * lineHeight;

    doc.setFontSize(11);
    doc.text(`Cliente: ${datos.receptor}`, margin, y);
    doc.text(`Fecha de emisión: ${fechaTexto}`, 200 - margin, y, { align: "right" });
    y += 2 * lineHeight;

    const p1 = `Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios. Con base en las diferentes pláticas sostenidas con personal de su empresa y a efecto de continuar con la relación que hemos desarrollado con ${datos.receptor}, nos permitimos hacerle llegar la cotización de los siguientes servicios:`;
    const p2 = `${datos.descripcionCFDI}, ${textoIA}`;

    [p1, p2].forEach(p => {
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

    doc.setFontSize(11);
    doc.text("TÉRMINOS Y CONDICIONES:", margin, y); y += lineHeight;

    const terminos = [
      "Nuestros costos se manejan en moneda nacional.",
      "Los costos reflejados son un estimado final de la prestación del servicio.",
      "Los costos descritos no incluyen IVA.",
      "Servicios adicionales tendrán un costo extra.",
      "Los precios pueden cambiar sin previo aviso.",
      "Gastos extraordinarios como viáticos no están incluidos.",
      "Esta cotización tiene vigencia de 30 días."
    ];

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

  const generarWord = () => {
    const total = Object.values(datos?.montosPorMes || {}).reduce((acc, val) => acc + parseFloat(val || 0), 0);
    const totalEnLetra = numeroALetras(total);
    const fecha = new Date(datos.fechaCFDI);
    const textoIA = obtenerTextoSimuladoIA(datos.descripcionSAT);
    const fechaTexto = fecha.toLocaleDateString("es-MX", {
      day: "2-digit", month: "2-digit", year: "numeric"
    });

    const html = `
      <html><body style='font-family:Arial;'>
      <h2 style='text-align:center;'>COTIZACIÓN DE SERVICIOS</h2>
      <p><strong>Cliente:</strong> ${datos.receptor}<br><strong>Fecha de emisión:</strong> ${fechaTexto}</p>
      <p>Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios. Con base en las diferentes pláticas sostenidas con personal de su empresa y a efecto de continuar con la relación que hemos desarrollado con ${datos.receptor}, nos permitimos hacerle llegar la cotización de los siguientes servicios:</p>
      <p>${datos.descripcionCFDI}, ${textoIA}</p>
      <h3 style='text-align:center;'>COSTO</h3>
      <p style='text-align:center;'>${datos.descripcionCFDI}<br><strong>$${total.toLocaleString("es-MX")}</strong><br><em>${totalEnLetra}</em></p>
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
      <p style='text-align:center;'><strong>DEPARTAMENTO DE VENTAS</strong><br>${datos.proveedor}</p>
      </body></html>
    `;

    const blob = new Blob(['﻿', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cotizacion.doc";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!datos) return <div style={{ padding: 40, color: 'white' }}>Cargando datos...</div>;

  return (
    <div style={{ padding: 40, color: '#f9fafb' }}>
      <h2 style={{ textAlign: "center" }}>Vista previa del documento</h2>

      <div style={{
        backgroundColor: "#1f2937",
        padding: 24,
        borderRadius: 8,
        maxWidth: 800,
        margin: "auto",
        userSelect: "none"
      }}>
        <h3 style={{ textAlign: "center", color: "#f3f4f6" }}>COTIZACIÓN DE SERVICIOS</h3>
        <p><strong>Cliente:</strong> {datos.receptor}</p>
        <p style={{ textAlign: "right" }}><strong>Fecha de emisión:</strong> {new Date(datos.fechaCFDI).toLocaleDateString("es-MX")}</p>
        <p style={{ textAlign: "justify", color: "#d1d5db" }}>
          Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios. Con base en las diferentes pláticas sostenidas con personal de su empresa y a efecto de continuar con la relación que hemos desarrollado con {datos.receptor}, nos permitimos hacerle llegar la cotización de los siguientes servicios:
        </p>
        <p style={{ textAlign: "justify", color: "#d1d5db" }}>
          {datos.descripcionCFDI}, {obtenerTextoSimuladoIA(datos.descripcionSAT)}
        </p>
        <p style={{ textAlign: "center", marginTop: 20, color: "#9ca3af" }}>⚠️ Esta es una vista parcial. El documento completo se genera al descargar el PDF o Word.</p>
      </div>

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button onClick={generarPDF} style={{
          backgroundColor: "#10b981",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: 10
        }}>
          Descargar PDF
        </button>
        <button onClick={generarWord} style={{
          backgroundColor: "#3b82f6",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Descargar Word
        </button>
      </div>
    </div>
  );
}