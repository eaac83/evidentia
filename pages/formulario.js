
import { useState } from "react";
import { useRouter } from "next/router";

const mesesDelAnio = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function esDiaHabil(fecha) {
  const dia = fecha.getDay();
  return dia !== 0 && dia !== 6;
}

function restarDiasHabiles(fecha, dias) {
  let count = 0;
  const nuevaFecha = new Date(fecha);
  while (count < dias) {
    nuevaFecha.setDate(nuevaFecha.getDate() - 1);
    if (esDiaHabil(nuevaFecha)) count++;
  }
  return nuevaFecha;
}

function obtenerDiaHabilEnMesSiguiente(mes, anio) {
  const siguienteMes = new Date(anio, mes + 1, 1);
  let count = 0;
  while (count < 10) {
    if (esDiaHabil(siguienteMes)) return new Date(siguienteMes);
    siguienteMes.setDate(siguienteMes.getDate() + 1);
    count++;
  }
  return siguienteMes;
}

export default function Formulario() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    codigoSAT: "86101709",
    descripcionSAT: "Servicios de capacitación en seguridad",
    detalleServicio: "",
    fechaCFDI: "",
    rfcProveedor: "",
    mesesSeleccionados: [],
    proveedor: "",
    receptor: "",
    email: "",
    notas: "",
    actividadSolicitante: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleMes = (mes) => {
    setFormData((prev) => {
      const yaMarcado = prev.mesesSeleccionados.includes(mes);
      return {
        ...prev,
        mesesSeleccionados: yaMarcado
          ? prev.mesesSeleccionados.filter((m) => m !== mes)
          : [...prev.mesesSeleccionados, mes]
      };
    });
  };

  const continuar = () => {
    if (!formData.actividadSolicitante || formData.actividadSolicitante.trim() === "") {
      const confirmar = window.confirm(`⚠️ Está omitiendo la descripción de la actividad principal de su empresa.

Sin esta información, la evidencia generada será genérica y no estará alineada a su sector.

¿Desea continuar de todos modos?`);
      if (!confirmar) return;
    }

    const fechaCFDI = new Date(formData.fechaCFDI);
    const fechaCotizacion = restarDiasHabiles(fechaCFDI, 15);
    const fechaAceptacion = restarDiasHabiles(fechaCFDI, 5);
    const fechaSolicitud = new Date();

    const minutas = {};
    formData.mesesSeleccionados.forEach((mesNombre) => {
      const indexMes = mesesDelAnio.indexOf(mesNombre);
      if (indexMes !== -1) {
        const fecha = obtenerDiaHabilEnMesSiguiente(indexMes, fechaCFDI.getFullYear());
        minutas[mesNombre] = fecha.toISOString().split('T')[0];
      }
    });

    const registro = {
      fechaSolicitud: fechaSolicitud.toISOString().split('T')[0],
      fechaCFDI: formData.fechaCFDI,
      fechaCotizacion: fechaCotizacion.toISOString().split('T')[0],
      fechaAceptacion: fechaAceptacion.toISOString().split('T')[0],
      mesesSolicitados: formData.mesesSeleccionados,
      minutas,
      receptor: formData.receptor,
      proveedor: formData.proveedor,
      rfcProveedor: formData.rfcProveedor,
      correo: formData.email,
      actividadSolicitante: formData.actividadSolicitante,
      montoTotal: formData.mesesSeleccionados.length * 500
    };

    const registrosExistentes = JSON.parse(localStorage.getItem("evidentia_solicitudes") || "[]");
    registrosExistentes.push(registro);
    localStorage.setItem("evidentia_solicitudes", JSON.stringify(registrosExistentes));

    localStorage.setItem("formularioData", JSON.stringify(formData));
    router.push("/resumen");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0D1117", padding: "40px", color: "white", fontFamily: "sans-serif" }}>
      <div style={{
        maxWidth: "700px",
        margin: "0 auto",
        backgroundColor: "#1F2937",
        borderRadius: "12px",
        padding: "30px",
        boxShadow: "0 0 20px rgba(0,0,0,0.4)"
      }}>
        <h1 style={{ fontSize: "24px", marginBottom: "20px", color: "#F3F4F6" }}>📝 Solicitar Evidencia Documental</h1>

        <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
          <label style={{ marginBottom: "6px", fontWeight: "bold", color: "#9CA3AF" }}>Razón social del receptor</label>
          <input name="receptor" value={formData.receptor} onChange={handleChange} style={{
            backgroundColor: "#161B22",
            border: "1px solid #30363d",
            color: "#F3F4F6",
            padding: "10px",
            borderRadius: "8px",
            fontSize: "14px"
          }} />
        </div>

        {/* Botón */}
        <button onClick={continuar} style={{
          marginTop: "30px",
          padding: "12px 24px",
          backgroundColor: "#4ADE80",
          color: "#0D1117",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          Continuar
        </button>
      </div>
    </div>
  );
}
