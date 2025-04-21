
import { useState } from "react";
import { useRouter } from "next/router";

export default function Formulario() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    receptor: "",
    proveedor: "",
    codigoSAT: "",
    descripcionSAT: "",
    fechaCFDI: "",
    actividad: "",
    mesesSeleccionados: [],
    valoresMensuales: {},
    contacto: "",
    fechaCotizacion: ""
  });

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
    const fechaCotizacion = new Date(formData.fechaCFDI);
    const fechaCot = new Date(fechaCotizacion);
    fechaCot.setDate(fechaCot.getDate() - 15); // -15 días hábiles aprox.

    const datosFinales = {
      ...formData,
      fechaCotizacion: fechaCot.toISOString().split("T")[0],
      montoCFDI: Object.values(formData.valoresMensuales).reduce((a, b) => a + b, 0)
    };

    localStorage.setItem("formularioDatos", JSON.stringify(datosFinales));
    router.push("/preview");
  };

  return (
    <div className="bg-[#0D1117] min-h-screen text-white p-6">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-[#1F2937] p-6 rounded space-y-4">
        <h2 className="text-xl font-bold mb-4">📝 Solicitud de Evidencia y Soporte Documental</h2>

        <input required className="w-full p-2 rounded bg-gray-800 text-white" name="receptor" placeholder="Razón social del receptor" onChange={handleChange} />

        <input className="w-full p-2 rounded bg-gray-800 text-white" name="actividad" placeholder="Actividad principal o giro de la empresa (opcional)" onChange={handleChange} />

        <input required className="w-full p-2 rounded bg-gray-800 text-white" name="proveedor" placeholder="Razón social del proveedor (quien emitió el CFDI)" onChange={handleChange} />

        <input required className="w-full p-2 rounded bg-gray-800 text-white" name="codigoSAT" placeholder="Código SAT del servicio (ej. 86101709)" onChange={handleChange} />

        <input required className="w-full p-2 rounded bg-gray-800 text-white" name="descripcionSAT" placeholder="Descripción del servicio SAT (ej. capacitación en seguridad)" onChange={handleChange} />

        <label className="block text-sm mt-2">📅 Fecha del CFDI o contrato:</label>
        <input required type="date" className="w-full p-2 rounded bg-gray-800 text-white" name="fechaCFDI" onChange={handleChange} />

        <label className="block mt-4">📆 Selecciona los meses a justificar:</label>
        <div className="grid grid-cols-2 gap-2">
          {mesesDelAno.map((mes) => (
            <div key={mes} className="flex items-center space-x-2">
              <input type="checkbox" id={mes} onChange={() => toggleMes(mes)} />
              <label htmlFor={mes}>{mes}</label>
              {formData.mesesSeleccionados.includes(mes) && (
                <input
                  type="number"
                  placeholder="$"
                  min="0"
                  step="0.01"
                  className="ml-2 w-28 p-1 rounded bg-gray-700 text-white"
                  onChange={(e) => handleValorMes(mes, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        <input required className="w-full p-2 rounded bg-gray-800 text-white mt-4" name="contacto" placeholder="Correo o medio de contacto para enviar la evidencia" onChange={handleChange} />

        <button type="submit" className="w-full bg-green-500 text-black font-bold p-3 rounded mt-6">Generar documentos</button>
      </form>
    </div>
  );
}
