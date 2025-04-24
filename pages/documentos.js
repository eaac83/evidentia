import { useEffect, useState } from "react";
import jsPDF from "jspdf";

// IA Simulada
function obtenerTextoSimuladoIA(descripcionSAT) {
  if (!descripcionSAT) return "";
  const desc = descripcionSAT.toLowerCase();
  if (desc.includes("limpieza")) return "solicitud de servicios generales de limpieza y mantenimiento preventivo en instalaciones administrativas.";
  if (desc.includes("consultoría")) return "asesoría profesional enfocada en la mejora de procesos administrativos y organizacionales.";
  if (desc.includes("logística") || desc.includes("suministro")) return "servicios especializados de análisis y mejora en la cadena de suministro y aprovisionamiento logístico.";
  return "prestación de servicios profesionales conforme a los objetivos operativos definidos.";
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
    if (parseInt(millones) > 0) letras += (millones === '001') ? 'un millón ' : convertirGrupo(millones) + ' millones ';
    if (parseInt(miles) > 0) letras += (miles === '001') ? 'mil ' : convertirGrupo(miles) + ' mil ';
    if (parseInt(cientos) > 0) letras += convertirGrupo(cientos);
    return letras.trim();
  }
  const partes = parseFloat(num).toFixed(2).split('.');
  const entero = parseInt(partes[0]);
  const centavos = partes[1];
  if (entero === 0) return `Cero pesos ${centavos}/100 M.N.`;
  const letras = convertirNumero(entero);
  return letras.charAt(0).toUpperCase() + letras.slice(1) + ` pesos ${centavos}/100 M.N.`;
}

function generarContenidoDocumento(tipo, datos) {
  const fechaCFDI = new Date(datos.fechaCFDI);
  const fechaTexto = new Date(fechaCFDI);
  let fechaReferencia = new Date(fechaCFDI);
  if (tipo === "solicitud") fechaReferencia.setDate(fechaReferencia.getDate() - 28);
  if (tipo === "aceptacion") fechaReferencia.setDate(fechaReferencia.getDate() - 10);
  if (tipo === "plan") fechaReferencia.setDate(fechaReferencia.getDate() - 5);
  const fechaFormateada = fechaReferencia.toLocaleDateString("es-MX", {
    day: "2-digit", month: "2-digit", year: "numeric"
  });
  const periodo = fechaCFDI.toLocaleDateString("es-MX", {
    year: "numeric", month: "2-digit"
  });
  const textoIA = obtenerTextoSimuladoIA(datos.descripcionSAT);
  const descripcion = `${datos.descripcionCFDI}, ${textoIA}`;
  const receptor = datos.receptor;
  const proveedor = datos.proveedor;
  const total = Object.values(datos?.montosPorMes || {}).reduce((acc, val) => acc + parseFloat(val || 0), 0);
  const totalEnLetra = numeroALetras(total);
  let texto = "";

  if (tipo === "solicitud") {
    texto += `Fecha: ${fechaFormateada}\n\nPor medio de la presente, me permito saludarle cordialmente...\n> ${descripcion}\n\nPeriodo estimado de ejecución: ${periodo}\nÁrea solicitante: Dirección Administrativa\nObjetivo: Operación estratégica\n\nAtentamente,\n${receptor}\nÁrea Solicitante`;
  }

  if (tipo === "aceptacion") {
    texto += `Fecha: ${fechaFormateada}\n\nEn seguimiento a la cotización enviada...\n> ${descripcion}\n\nConfirmamos nuestra conformidad...\n\nAtentamente,\n${receptor}\nÁrea Administrativa`;
  }

  if (tipo === "plan") {
    texto += `Fecha: ${fechaFormateada}\n\nPlan de trabajo correspondiente a:\n> ${descripcion}\n\nAlcance: Metodología basada en resultados.\nObjetivos:\n- Entregables mensuales\n- Seguimiento técnico\n- Informe final\nInicio: ${fechaCFDI.toLocaleDateString("es-MX")}\nDuración: 30 días\nResponsable técnico: Coordinación Técnica\n\n${proveedor}\nDepartamento Técnico`;
  }

  if (tipo === "cotizacion") {
    texto += `Fecha de emisión: ${fechaFormateada}\n\n${receptor}\n\n${descripcion}\n\nCOSTO DEL SERVICIO:\n$${total.toLocaleString("es-MX")}\n${totalEnLetra}\n\nTÉRMINOS:\n- Costos en moneda nacional\n- No incluye IVA\n- Sujeto a cambios\n- Vigencia 30 días\n\nAtentamente,\nDEPARTAMENTO DE VENTAS\n${proveedor}`;
  }

  return texto;
}

export default function Documentos() {
  const [datos, setDatos] = useState(null);
  const [tipo, setTipo] = useState("solicitud");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("formularioDatos"));
    setDatos(stored);
  }, []);

  const generarPDF = () => {
    const doc = new jsPDF();
    const margin = 15;
    const y = 15;
    const contenido = generarContenidoDocumento(tipo, datos);
    doc.setFontSize(14);
    doc.text(tipo.toUpperCase().replace("PLAN", "PLAN DE TRABAJO").replace("ACEPTACION", "ACEPTACIÓN DE SERVICIO").replace("COTIZACION", "COTIZACIÓN DE SERVICIOS").replace("SOLICITUD", "SOLICITUD DE SERVICIOS"), 105, y, { align: "center" });
    doc.setFontSize(11);
    doc.text(doc.splitTextToSize(contenido, 180), margin, y + 10);
    doc.save(`${tipo}.pdf`);
  };

  if (!datos) return <div style={{ padding: 40, color: 'white' }}>Cargando datos...</div>;

  return (
    <div style={{ padding: 40, color: '#f9fafb' }}>
      <h2 style={{ textAlign: "center" }}>Vista previa: {tipo.toUpperCase()}</h2>
      <div style={{
        backgroundColor: "#1f2937", padding: 24, borderRadius: 8, maxWidth: 800, margin: "auto", userSelect: "none"
      }}>
        <p style={{ textAlign: "justify", color: "#d1d5db", whiteSpace: "pre-line" }}>
          {generarContenidoDocumento(tipo, datos)}
        </p>
      </div>
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button onClick={generarPDF} style={{
          backgroundColor: "#10b981", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: 10
        }}>
          Descargar PDF
        </button>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{
          padding: "10px", borderRadius: "5px", border: "1px solid #ccc"
        }}>
          <option value="solicitud">Solicitud de Servicios</option>
          <option value="cotizacion">Cotización de Servicios</option>
          <option value="aceptacion">Aceptación del Servicio</option>
          <option value="plan">Plan de Trabajo</option>
        </select>
      </div>
    </div>
  );
}