import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Montos() {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [montosFechas, setMontosFechas] = useState({});
  const [fechaLimite, setFechaLimite] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("formularioDatos");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
      setFechaLimite(parsedData.fechaCFDI);

      const inicial = {};
      parsedData.mesesSeleccionados.forEach((mes) => {
        inicial[mes] = {
          monto: "",
          fecha: parsedData.tipoDocumento === "CFDI" ? parsedData.fechaCFDI : ""
        };
      });
      setMontosFechas(inicial);
    }
  }, []);

  const handleMontoChange = (mes, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    const formatted = new Intl.NumberFormat("es-MX").format(numericValue);
    setMontosFechas((prev) => ({
      ...prev,
      [mes]: { ...prev[mes], monto: formatted }
    }));
  };

  const handleFechaChange = (mes, value) => {
    setMontosFechas((prev) => ({
      ...prev,
      [mes]: { ...prev[mes], fecha: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const datosCompletos = { ...formData, montosFechas };
    localStorage.setItem("datosCompletos", JSON.stringify(datosCompletos));
    router.push("/preview");
  };

  if (!formData)
    return (
      <div className="registro-container">
        <div className="registro-card">
          <p>Cargando datos...</p>
        </div>
      </div>
    );

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h2 className="registro-title">📝 Registro de Montos y Fechas</h2>
        <form onSubmit={handleSubmit} className="registro-form">
          {formData.mesesSeleccionados.map((mes) => (
            <div key={mes}>
              <label htmlFor={`monto-${mes}`}>Monto para {mes}:</label>
              <input
                type="text"
                id={`monto-${mes}`}
                value={montosFechas[mes].monto}
                onChange={(e) => handleMontoChange(mes, e.target.value)}
                required
              />

              <label htmlFor={`fecha-${mes}`}>
                Fecha de servicio para {mes}:
              </label>
              <input
                type="date"
                id={`fecha-${mes}`}
                value={montosFechas[mes].fecha}
                onChange={(e) => handleFechaChange(mes, e.target.value)}
                max={fechaLimite}
                required
              />
            </div>
          ))}

          <button type="submit" className="btn-formulario">
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
