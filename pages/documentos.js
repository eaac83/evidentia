import { useEffect, useState } from "react";

export default function Documentos() {
  const [datos, setDatos] = useState(null);
  const [tipo, setTipo] = useState("solicitud");

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("formularioDatos"));
    setDatos(info || {});
  }, []);

  const textos = {
    solicitud: `SOLICITUD DE SERVICIOS

Por medio de la presente, me permito saludarle cordialmente y manifestar nuestro interés en formalizar la solicitud de servicios con su estimada empresa.

Limpieza de edificios (servicios generales de limpieza y mantenimiento preventivo de oficinas, pasillos, áreas comunes y zonas operativas).

El presente servicio se solicita para su ejecución durante el periodo estimado correspondiente al mes 02/2025.

Agradecemos su atención a la presente solicitud.`,
    cotizacion: `COTIZACIÓN DE SERVICIOS

Con base en la solicitud formal de servicios emitida el 07 de enero de 2025, y en atención a las conversaciones previas sostenidas con su equipo, nos permitimos hacerle llegar la presente cotización del siguiente servicio:

Limpieza de edificios.

COSTO DEL SERVICIO:
$580,245
Quinientos ochenta mil doscientos cuarenta y cinco pesos 00/100 M.N.

TÉRMINOS Y CONDICIONES:
- Moneda nacional
- No incluye IVA
- Vigencia 30 días`,
    aceptacion: `ACEPTACIÓN DE SERVICIO

En seguimiento a la cotización enviada el 04 de febrero de 2025, confirmamos la aceptación conforme al monto propuesto y condiciones.

Limpieza de edificios.`,
    plan: `PLAN DE TRABAJO

Plan correspondiente al servicio de limpieza de edificios.

Inicio estimado: 04/02/2025
Duración: 30 días
Responsable técnico: JESUS ALONSO REYNOSO`
  };

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: "auto", color: "#f0f0f0", userSelect: "none" }}>
      <h2 style={{ textAlign: "center" }}>
        {tipo.toUpperCase().replace("COTIZACION", "COTIZACIÓN DE SERVICIOS").replace("ACEPTACION", "ACEPTACIÓN DE SERVICIO")}
      </h2>
      <div style={{ backgroundColor: "#1f2937", padding: 20, borderRadius: 10, minHeight: 300 }}>
        <pre style={{
          whiteSpace: "pre-wrap",
          textAlign: "justify",
          fontFamily: "Times New Roman",
          overflow: "hidden",
          maxHeight: 160,
        }}>
          {textos[tipo].split("\n").slice(0, 6).join("\n") + "\n..."}
        </pre>
      </div>

      <div style={{ marginTop: 30, textAlign: "center" }}>
        <button
          onClick={() => {
            const encabezado = tipo === 'solicitud' ? "A: JESUS ALONSO REYNOSO\nDepartamento de Ventas\n\n" : "";
            const blob = new Blob([encabezado + textos[tipo]], { type: "application/octet-stream" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = tipo + ".pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          style={{
            backgroundColor: "#10b981",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: 10
          }}
        >
          Descargar PDF
        </button>
        <button
          onClick={() => {
            const confirmacion = confirm(
              '⚠️ La descarga del formato editable (Word) implica un cargo adicional de $58.00 MXN.\n\nSe recomienda descargar el documento editable para personalizar con su logotipo o realizar ajustes internos.'
            );
            if (confirmacion) {
              const encabezado = tipo === 'solicitud' ? "A: JESUS ALONSO REYNOSO\nDepartamento de Ventas\n\n" : "";
              const blob = new Blob([encabezado + textos[tipo]], { type: "application/msword" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = tipo + ".docx";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }}
          style={{
            backgroundColor: "#f59e0b",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Descargar Editable
        </button>
      </div>

      <div style={{ marginTop: 20, textAlign: "center" }}>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ padding: "10px", borderRadius: "5px" }}>
          <option value="solicitud">Solicitud de Servicios</option>
          <option value="cotizacion">Cotización de Servicios</option>
          <option value="aceptacion">Aceptación del Servicio</option>
          <option value="plan">Plan de Trabajo</option>
        </select>
      </div>
    </div>
  );
}