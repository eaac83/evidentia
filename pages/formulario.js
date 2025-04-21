
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
    notas: ""
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("formularioDatos", JSON.stringify(formData));
    router.push("/preview");
  };

  return (
    <div className="bg-[#0D1117] min-h-screen text-white py-10 px-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-[#1F2937] p-8 rounded-lg shadow-lg space-y-8">
        <h1 className="text-3xl font-bold text-center">📝 Solicitud de Evidencia y Soporte Documental</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label>Razón social del receptor</label>
            <input name="receptor" required className="w-full p-2 rounded bg-gray-800 text-white" onChange={handleChange} />
          </div>
          <div>
            <label>Actividad principal o giro (opcional)</label>
            <input name="actividad" className="w-full p-2 rounded bg-gray-800 text-white" onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <label>Correo o medio de contacto</label>
            <input name="contacto" required className="w-full p-2 rounded bg-gray-800 text-white" onChange={handleChange} />
          </div>
        </div>

        <hr className="border-gray-600" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div>
          <label>Fecha del CFDI o contrato</label>
          <input type="date" name="fechaCFDI" required className="w-full p-2 rounded bg-gray-800 text-white" onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-2">Selecciona los meses a justificar</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {meses.map((mes) => (
              <div key={mes} className="flex items-center space-x-2">
                <input type="checkbox" id={mes} onChange={() => toggleMes(mes)} />
                <label htmlFor={mes}>{mes}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label>Notas adicionales (opcional)</label>
          <input name="notas" className="w-full p-2 rounded bg-gray-800 text-white" onChange={handleChange} />
        </div>

        <button type="submit" className="w-full bg-green-500 text-black font-bold p-3 rounded mt-6">
          Generar documentos
        </button>
      </form>
    </div>
  );
}
