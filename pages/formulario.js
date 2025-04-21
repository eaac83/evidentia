
import { useState } from "react";
import { useRouter } from "next/router";

export default function Formulario() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    receptor: "",
    actividad: "",
    contacto: "",
    proveedor: "",
    rfcProveedor: "",
    codigoSAT: "",
    descripcionSAT: "",
    descripcionCFDI: "",
    fechaCFDI: "",
    mesesSeleccionados: [],
    valoresMensuales: {},
    notas: ""
  });

  const [alertaActividad, setAlertaActividad] = useState(false);

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleMes = (mes) => {
    const seleccionados = formData.mesesSeleccionados.includes(mes)
      ? formData.mesesSeleccionados.filter((m) => m !== mes)
      : [...formData.mesesSeleccionados, mes];
    setFormData({ ...formData, mesesSeleccionados: seleccionados });
  };

  const handleMontoMes = (mes, valor) => {
    setFormData((prev) => ({
      ...prev,
      valoresMensuales: {
        ...prev.valoresMensuales,
        [mes]: parseFloat(valor) || 0
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.actividad) {
      setAlertaActividad(true);
      return;
    }

    const fechaCotizacion = new Date(formData.fechaCFDI);
    fechaCotizacion.setDate(fechaCotizacion.getDate() - 15);
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
    <div className="bg-[#0D1117] min-h-screen text-white py-10 px-4">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto bg-[#1F2937] p-10 rounded-lg shadow-xl space-y-10">
        <h1 className="text-3xl font-bold text-center mb-6">📝 Solicitud de Evidencia y Soporte Documental</h1>

        {/* Sección Receptor */}
        <fieldset className="border border-gray-600 p-6 rounded">
          <legend className="text-xl font-semibold px-2">Datos del receptor</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-4">
            <div>
              <label>Razón social del receptor</label>
              <input name="receptor" required className="w-full min-w-[250px] p-2 rounded bg-gray-800 text-white" onChange={handleChange} />
            </div>
            <div>
              <label>Actividad principal o giro (opcional)</label>
              <input name="actividad" className="w-full min-w-[250px] p-2 rounded bg-gray-800 text-white" onChange={handleChange} />
              {alertaActividad && <p className="text-yellow-400 text-sm mt-1">⚠️ Si omite el giro, la evidencia será genérica.</p>}
            </div>
            <div className="md:col-span-2">
              <label>Correo o medio de contacto</label>
              <input name="contacto" required className="w-full p-2 rounded bg-gray-800 text-white" onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        {/* Sección Proveedor */}
        <fieldset className="border border-gray-600 p-6 rounded">
          <legend className="text-xl font-semibold px-2">Datos del proveedor</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-4">
            <div>
              <label>Razón social del proveedor</label>
              <input name="proveedor" required className="w-full p-2 rounded bg-gray-800 text-white" onChange={handleChange} />
            </div>
            <div>
              <label>RFC del proveedor</label>
              <input name="rfcProveedor" required className="w-full p-2 rounded bg-gray-800 text-white" onChange={handleChange} />
            </div>
            <div>
              <label>Código SAT del servicio</label>
              <input name="codigoSAT" required className="w-full p-2 rounded bg-gray-800 text-white" onChange={handleChange} />
            </div>
            <div>
              <label>Descripción SAT del servicio</label>
              <input name="descripcionSAT" required className="w-full p-2 rounded bg-gray-800 text-white" onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <label>Descripción del CFDI del servicio prestado</label>
              <input name="descripcionCFDI" className="w-full p-2 rounded bg-gray-800 text-white" onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        {/* Fecha */}
        <fieldset className="border border-gray-600 p-6 rounded">
          <legend className="text-xl font-semibold px-2">Fecha del CFDI</legend>
          <label className="block mt-4">Fecha del CFDI o contrato</label>
          <input type="date" name="fechaCFDI" required className="w-full p-2 rounded bg-gray-800 text-white" onChange={handleChange} />
        </fieldset>

        {/* Meses y montos */}
        <fieldset className="border border-gray-600 p-6 rounded">
          <legend className="text-xl font-semibold px-2">Meses de trabajo</legend>
          <label className="block mt-4 mb-4">Selecciona los meses e ingresa el monto</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {meses.map((mes) => (
              <div key={mes} className="flex items-center space-x-2">
                <input type="checkbox" id={mes} onChange={() => toggleMes(mes)} />
                <label htmlFor={mes} className="w-20">{mes}</label>
                {formData.mesesSeleccionados.includes(mes) && (
                  <input
                    type="number"
                    placeholder="$"
                    className="flex-1 p-1 rounded bg-gray-700 text-white"
                    onChange={(e) => handleMontoMes(mes, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </fieldset>

        {/* Notas */}
        <fieldset className="border border-gray-600 p-6 rounded">
          <legend className="text-xl font-semibold px-2">Notas adicionales</legend>
          <input name="notas" className="w-full p-2 mt-4 rounded bg-gray-800 text-white" placeholder="Opcional" onChange={handleChange} />
        </fieldset>

        <button type="submit" className="w-full bg-green-500 hover:bg-green-400 text-black font-bold p-3 rounded-lg mt-6 transition-all">
          Generar documentos
        </button>
      </form>
    </div>
  );
}
