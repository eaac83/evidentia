
import { useState } from "react";
import { useRouter } from "next/router";

export default function Formulario() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    receptor: "",
    actividad: "",
    proveedor: "",
    codigoSAT: "",
    descripcionSAT: "",
    fechaCFDI: "",
    mesesSeleccionados: [],
    valoresMensuales: {},
    contacto: ""
  });

  const [alertaActividad, setAlertaActividad] = useState(false);
  const mesesDelAno = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const toggleMes = (mes) => {
    const seleccionados = formData.mesesSeleccionados.includes(mes)
      ? formData.mesesSeleccionados.filter((m) => m !== mes)
      : [...formData.mesesSeleccionados, mes];

    setFormData({
      ...formData,
      mesesSeleccionados: seleccionados
    });
  };

  const handleValorMes = (mes, valor) => {
    setFormData((prev) => ({
      ...prev,
      valoresMensuales: {
        ...prev.valoresMensuales,
        [mes]: parseFloat(valor) || 0
      }
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.actividad) {
      setAlertaActividad(true);
      return;
    }

    const fechaCotizacion = new Date(formData.fechaCFDI);
    fechaCotizacion.setDate(fechaCotizacion.getDate() - 15); // -15 días hábiles aprox.

    const montoCFDI = Object.values(formData.valoresMensuales).reduce((a, b) => a + b, 0);

    const datosFinales = {
      ...formData,
      fechaCotizacion: fechaCotizacion.toISOString().split("T")[0],
      montoCFDI
    };

    localStorage.setItem("formularioDatos", JSON.stringify(datosFinales));
    router.push("/preview");
  };

  return (
    <div className="bg-[#0D1117] min-h-screen text-white p-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-[#1F2937] p-6 rounded-lg shadow space-y-5">
        <h2 className="text-2xl font-bold">📝 Solicitud de Evidencia y Soporte Documental</h2>

        <div>
          <label>Razón social del receptor:</label>
          <input required name="receptor" className="w-full p-2 rounded bg-gray-800 text-white mt-1" onChange={handleChange} />
        </div>

        <div>
          <label>Actividad principal o giro de la empresa:</label>
          <input name="actividad" className="w-full p-2 rounded bg-gray-800 text-white mt-1" onChange={handleChange} />
          {alertaActividad && (
            <p className="text-yellow-400 text-sm mt-1">
              ⚠️ Si no indicas el giro, la evidencia será generada de forma genérica. ¿Deseas continuar?
            </p>
          )}
        </div>

        <div>
          <label>Razón social del proveedor (quien emitió el CFDI):</label>
          <input required name="proveedor" className="w-full p-2 rounded bg-gray-800 text-white mt-1" onChange={handleChange} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Código SAT del servicio:</label>
            <input required name="codigoSAT" className="w-full p-2 rounded bg-gray-800 text-white mt-1" onChange={handleChange} />
          </div>
          <div>
            <label>Descripción del servicio SAT:</label>
            <input required name="descripcionSAT" className="w-full p-2 rounded bg-gray-800 text-white mt-1" onChange={handleChange} />
          </div>
        </div>

        <div>
          <label>📅 Fecha del CFDI o contrato:</label>
          <input required type="date" name="fechaCFDI" className="w-full p-2 rounded bg-gray-800 text-white mt-1" onChange={handleChange} />
        </div>

        <div>
          <label>📆 Selecciona los meses a justificar e ingresa el monto por cada uno:</label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {mesesDelAno.map((mes) => (
              <div key={mes} className="flex items-center gap-2">
                <input type="checkbox" id={mes} onChange={() => toggleMes(mes)} />
                <label htmlFor={mes} className="w-24">{mes}</label>
                {formData.mesesSeleccionados.includes(mes) && (
                  <input
                    type="number"
                    placeholder="$ Monto"
                    min="0"
                    step="0.01"
                    className="flex-1 p-1 rounded bg-gray-700 text-white"
                    onChange={(e) => handleValorMes(mes, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label>📨 Correo o medio de contacto:</label>
          <input required name="contacto" className="w-full p-2 rounded bg-gray-800 text-white mt-1" onChange={handleChange} />
        </div>

        <button type="submit" className="w-full bg-green-500 text-black font-bold p-3 rounded mt-4">
          Generar documentos
        </button>
      </form>
    </div>
  );
}
