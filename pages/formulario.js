
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
    <div className="bg-[#0D1117] min-h-screen text-white py-12 px-6">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto bg-[#1F2937] p-10 rounded-2xl shadow-2xl space-y-12">
        <h1 className="text-4xl font-extrabold text-center text-white mb-4">📝 Solicitud de Evidencia y Soporte Documental</h1>

        {/* Sección Receptor */}
        <section>
          <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-6">Datos del receptor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-gray-300 block mb-1">Razón social del receptor</label>
              <input name="receptor" required className="w-full p-3 rounded-lg bg-gray-700 text-white shadow-md" onChange={handleChange} />
            </div>
            <div>
              <label className="text-gray-300 block mb-1">Actividad principal o giro (opcional)</label>
              <input name="actividad" className="w-full p-3 rounded-lg bg-gray-700 text-white shadow-md" onChange={handleChange} />
              {alertaActividad && <p className="text-yellow-400 text-sm mt-1">⚠️ Si omite el giro, la evidencia será genérica.</p>}
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-300 block mb-1">Correo o medio de contacto</label>
              <input name="contacto" required className="w-full p-3 rounded-lg bg-gray-700 text-white shadow-md" onChange={handleChange} />
            </div>
          </div>
        </section>

        {/* Sección Proveedor */}
        <section>
          <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-6">Datos del proveedor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-gray-300 block mb-1">Razón social del proveedor</label>
              <input name="proveedor" required className="w-full p-3 rounded-lg bg-gray-700 text-white shadow-md" onChange={handleChange} />
            </div>
            <div>
              <label className="text-gray-300 block mb-1">RFC del proveedor</label>
              <input name="rfcProveedor" required className="w-full p-3 rounded-lg bg-gray-700 text-white shadow-md" onChange={handleChange} />
            </div>
            <div>
              <label className="text-gray-300 block mb-1">Código SAT del servicio</label>
              <input name="codigoSAT" required className="w-full p-3 rounded-lg bg-gray-700 text-white shadow-md" onChange={handleChange} />
            </div>
            <div>
              <label className="text-gray-300 block mb-1">Descripción SAT del servicio</label>
              <input name="descripcionSAT" required className="w-full p-3 rounded-lg bg-gray-700 text-white shadow-md" onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-300 block mb-1">Descripción del CFDI del servicio prestado</label>
              <input name="descripcionCFDI" className="w-full p-3 rounded-lg bg-gray-700 text-white shadow-md" onChange={handleChange} />
            </div>
          </div>
        </section>

        {/* Fecha */}
        <section>
          <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-6">Fecha del CFDI</h2>
          <input type="date" name="fechaCFDI" required className="w-full p-3 rounded-lg bg-gray-700 text-white shadow-md" onChange={handleChange} />
        </section>

        {/* Meses y montos */}
        <section>
          <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-6">Meses de trabajo</h2>
          <p className="text-gray-300 mb-4">Selecciona los meses e ingresa el monto correspondiente</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {meses.map((mes) => (
              <div key={mes} className="flex items-center space-x-2">
                <input type="checkbox" id={mes} onChange={() => toggleMes(mes)} />
                <label htmlFor={mes} className="w-24">{mes}</label>
                {formData.mesesSeleccionados.includes(mes) && (
                  <input
                    type="number"
                    placeholder="$"
                    className="flex-1 p-2 rounded bg-gray-700 text-white shadow-sm"
                    onChange={(e) => handleMontoMes(mes, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Notas */}
        <section>
          <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-6">Notas adicionales</h2>
          <input name="notas" className="w-full p-3 rounded-lg bg-gray-700 text-white shadow-md" placeholder="Opcional" onChange={handleChange} />
        </section>

        <div>
          <button type="submit" className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-xl transition-all text-lg">
            Generar documentos
          </button>
        </div>
      </form>
    </div>
  );
}
