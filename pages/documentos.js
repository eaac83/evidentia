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

Por medio de la presente, me permito saludarle cordialmente y manifestar nuestro interés en formalizar la solicitud de servicios con su estimada empresa. En atención a las necesidades detectadas en nuestras operaciones, requerimos el siguiente servicio:

Limpieza de edificios (servicios generales de limpieza y mantenimiento preventivo de oficinas, pasillos, áreas comunes y zonas operativas).

El presente servicio se solicita para su ejecución durante el periodo estimado correspondiente al mes 02/2025. Esta solicitud es emitida por el área de Dirección Administrativa con el propósito de atender acciones prioritarias para el adecuado funcionamiento institucional.

Agradecemos su atención a la presente solicitud, quedando atentos para recibir su cotización y condiciones del servicio.

Atentamente,
JAR SOLUCIONES INDUSTRIALES
Dirección Administrativa`,
    cotizacion: `COTIZACIÓN DE SERVICIOS

A: JAR SOLUCIONES INDUSTRIALES

Le enviamos un cordial saludo y un agradecimiento por el interés mostrado en nuestros servicios.

Con base en la solicitud formal de servicios emitida por ustedes con fecha 07 de enero de 2025, y en atención a las conversaciones previas sostenidas con su equipo, nos permitimos hacerle llegar la presente cotización del siguiente servicio:

Limpieza de edificios (servicios generales de limpieza y mantenimiento preventivo de instalaciones administrativas y operativas).

COSTO DEL SERVICIO:
$580,245
Quinientos ochenta mil doscientos cuarenta y cinco pesos 00/100 M.N.

TÉRMINOS Y CONDICIONES:
- Nuestros costos se manejan en moneda nacional.
- Los costos reflejados son estimados y pueden estar sujetos a cambios.
- No incluyen IVA.
- Cualquier servicio adicional tendrá un cargo extra.
- Gastos extraordinarios como viáticos no están incluidos.
- Vigencia de esta cotización: 30 días naturales.

Agradecemos su preferencia y quedamos atentos para cualquier duda o comentario.

Atentamente,
DEPARTAMENTO DE VENTAS
JESUS ALONSO REYNOSO`,
    aceptacion: `ACEPTACIÓN DE SERVICIO

A: JESUS ALONSO REYNOSO
Departamento de Ventas

En seguimiento a la cotización recibida el 04 de febrero de 2025, derivada de nuestra solicitud de servicios emitida con fecha 07 de enero de 2025, mediante la cual se nos ofrece el servicio de limpieza de edificios y mantenimiento preventivo en nuestras instalaciones, le informamos que tras una revisión detallada, procedemos a formalizar la aceptación de dicha cotización.

Confirmamos que estamos de acuerdo con los términos y condiciones señalados, incluyendo el monto, alcance del servicio, y periodo de vigencia establecido. Solicitamos que se inicie la ejecución conforme a lo propuesto.

Agradecemos la disposición de su equipo y reiteramos nuestro compromiso de colaboración durante el desarrollo del servicio.

JAR SOLUCIONES INDUSTRIALES
Área Administrativa`,
    plan: `PLAN DE TRABAJO

Servicio: Limpieza de Edificios  
Cliente: JAR SOLUCIONES INDUSTRIALES  
Proveedor: JESUS ALONSO REYNOSO

Conforme a la aceptación formal del servicio solicitado, se establece el presente Plan de Trabajo correspondiente al proyecto de limpieza general y mantenimiento preventivo de instalaciones administrativas.

ALCANCE GENERAL:
El servicio comprenderá la ejecución sistemática de acciones de limpieza profunda, recolección de residuos, higiene de superficies, y mantenimiento preventivo de áreas operativas.

OBJETIVOS ESPECÍFICOS:
- Mantener condiciones óptimas de higiene en todas las zonas asignadas.
- Reducir riesgos operativos por acumulación de residuos.
- Ejecutar el servicio conforme al cronograma pactado.

CRONOGRAMA DE EJECUCIÓN:
- Fecha de inicio: 04 de febrero de 2025
- Duración estimada: 30 días naturales

RESPONSABLE TÉCNICO:
Coordinación Técnica – JESUS ALONSO REYNOSO

Agradecemos su confianza y reiteramos nuestro compromiso con la calidad y cumplimiento del servicio pactado.

JESUS ALONSO REYNOSO
Departamento Técnico`
  };

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: "auto", color: "#f0f0f0" }}>
      <h2 style={{ textAlign: "center" }}>
        {tipo.toUpperCase().replace("COTIZACION", "COTIZACIÓN DE SERVICIOS").replace("ACEPTACION", "ACEPTACIÓN DE SERVICIO")}
      </h2>
      <div style={{ backgroundColor: "#1f2937", padding: 20, borderRadius: 10 }}>
        <pre style={{ whiteSpace: "pre-wrap", textAlign: "justify", fontFamily: "Times New Roman" }}>
          {encabezado + textos[tipo]}
        </pre>
      </div>
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ padding: "10px", borderRadius: "5px" }}>
          <option value="solicitud">Solicitud de Servicios</option>
          <option value="cotizacion">Cotización de Servicios</option>
          <option value="aceptacion">Aceptación del Servicio</option>
          <option value="plan">Plan de Trabajo</option>
        </select>
      </div>
    
      <div style={{ marginTop: 30, textAlign: "center" }}>
        <button
          onClick={() => {
            const blob = new Blob([(encabezado => new Blob([encabezado + textos[tipo]], { type: "application/octet-stream" });
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
              '⚠️ La descarga del formato editable (Word) implica un cargo adicional de $58.00 MXN.\n\nSe recomienda su uso para personalizar los documentos con el logotipo de su empresa o realizar ajustes según sus necesidades internas.'
            );
            if (confirmacion) {
              const blob = new Blob([(encabezado => new Blob([encabezado + textos[tipo]], { type: "application/msword" });
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
    </div>
  );
}