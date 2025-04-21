
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
    montosPorMes: {},
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
      const nuevosMeses = yaMarcado
        ? prev.mesesSeleccionados.filter((m) => m !== mes)
        : [...prev.mesesSeleccionados, mes];
      return {
        ...prev,
        mesesSeleccionados: nuevosMeses
      };
    });
  };

  const handleMontoChange = (mes, valor) => {
    setFormData((prev) => ({
      ...prev,
      montosPorMes: {
        ...prev.montosPorMes,
        [mes]: parseFloat(valor) || 0
      }
    }));
  };

  const continuar = () => {
    const montoTotalReal = formData.mesesSeleccionados.reduce((acc, mes) => acc + (formData.montosPorMes[mes] || 0), 0);
    const variacion = montoTotalReal * (Math.random() * 0.1 - 0.05);
    const montoCotizado = Math.round(montoTotalReal + variacion);

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
      montosPorMes: formData.montosPorMes,
      montoReal: montoTotalReal,
      montoCotizado: montoCotizado
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

        <div style={{ marginBottom: "20px" }}>
          <label>Fecha del CFDI o contrato</label>
          <input type="date" name="fechaCFDI" value={formData.fechaCFDI} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>RFC del proveedor</label>
          <input name="rfcProveedor" value={formData.rfcProveedor} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Código SAT</label>
          <input name="codigoSAT" value={formData.codigoSAT} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Descripción oficial SAT</label>
          <input name="descripcionSAT" value={formData.descripcionSAT} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Descripción del servicio prestado</label>
          <textarea name="detalleServicio" value={formData.detalleServicio} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Razón social del receptor</label>
          <input name="receptor" value={formData.receptor} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Actividad principal o giro de la empresa (opcional)</label>
          <input name="actividadSolicitante" value={formData.actividadSolicitante} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Meses a trabajar</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
            {mesesDelAnio.map((mes) => (
              <label key={mes}>
                <input
                  type="checkbox"
                  checked={formData.mesesSeleccionados.includes(mes)}
                  onChange={() => toggleMes(mes)}
                /> {mes}
              </label>
            ))}
          </div>
        </div>

        {formData.mesesSeleccionados.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <h3>💰 Monto pagado por cada mes</h3>
            {formData.mesesSeleccionados.map((mes) => (
              <div key={mes} style={{ marginBottom: "10px" }}>
                <label>{mes}:</label>
                <input
                  type="number"
                  value={formData.montosPorMes[mes] || ""}
                  onChange={(e) => handleMontoChange(mes, e.target.value)}
                  style={{ width: "100%", padding: "6px" }}
                />
              </div>
            ))}
          </div>
        )}

        <button onClick={continuar} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#4ADE80", color: "#0D1117", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
          Continuar
        </button>
      </div>
    </div>
  );
}
