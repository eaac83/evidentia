import { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function Documentos() {
  const [datos, setDatos] = useState(null);
  const [ventaFinalizada, setVentaFinalizada] = useState(false);
  const [editableLiberado, setEditableLiberado] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("formularioDatos"));
    setDatos(stored);
  }, []);

  const generarPDFCompleto = () => {
    if (!ventaFinalizada) {
      alert("Debe finalizar la venta para descargar el PDF.");
      return;
    }

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

  const generarWordEditable = () => {
    if (!ventaFinalizada) {
      alert("Debe finalizar la venta para continuar.");
      return;
    }

    if (!editableLiberado) {
      const aceptar = window.confirm(
        "El archivo editable de esta cotización tiene un costo adicional del 10% sobre nuestro servicio base de $500 MXN, más IVA.\n\n" +
        "Monto adicional: $58.00 MXN.\n\n" +
        "Este cargo será incluido en su caja para proceder con la liberación del documento editable.\n\n¿Desea continuar?"
      );
      if (!aceptar) return;
      setEditableLiberado(true);
    }

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

  if (!datos) return <div style={{ padding: 40 }}>Cargando información...</div>;

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: "center" }}>Vista previa del documento</h2>

      <p style={{ lineHeight: 1.6, textAlign: "justify" }}>
        Cliente: <strong>{datos.receptor}</strong><br />
        Fecha de emisión: <strong>{datos.fechaCFDI}</strong><br /><br />
        Le enviamos un cordial saludo y un agradecimiento por el interés mostrado por nuestros servicios.
        Con base en pláticas sostenidas con su empresa, presentamos un extracto de la cotización.<br /><br />
        <em>El contenido completo estará disponible tras la confirmación de la venta.</em>
      </p>

      <div style={{ textAlign: "center", marginTop: 40 }}>
        {!ventaFinalizada && (
          <button onClick={() => setVentaFinalizada(true)} style={{
            backgroundColor: "#10b981",
            padding: "10px 20px",
            border: "none",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px"
          }}>
            Simular pago (Finalizar venta)
          </button>
        )}

        {ventaFinalizada && (
          <>
            <button onClick={generarPDFCompleto} style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              marginRight: "10px",
              cursor: "pointer"
            }}>
              Descargar PDF
            </button>
            <button onClick={generarWordEditable} style={{
              backgroundColor: "#f59e0b",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}>
              Descargar Word
            </button>
          </>
        )}
      </div>
    </div>
  );
}