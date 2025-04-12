
import { useRouter } from "next/router";

export default function Resumen() {
  const router = useRouter();
  const datos = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("formularioData") || "{}") : {};

  const confirmar = () => {
    router.push("/preview");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0D1117", padding: "40px", color: "white", fontFamily: "sans-serif" }}>
      <div style={{
        maxWidth: "700px",
        margin: "0 auto",
        backgroundColor: "#1F2937",
        borderRadius: "12px",
        padding: "30px"
      }}>
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>📋 Resumen de la solicitud</h1>

        <p><strong>Código SAT:</strong> {datos.codigoSAT}</p>
        <p><strong>Descripción SAT:</strong> {datos.descripcionSAT}</p>
        <p><strong>Detalle del servicio:</strong> {datos.detalleServicio}</p>
        <p><strong>Proveedor:</strong> {datos.proveedor}</p>
        <p><strong>Receptor:</strong> {datos.receptor}</p>
        <p><strong>Email:</strong> {datos.email}</p>
        <p><strong>Meses seleccionados:</strong> {datos.mesesSeleccionados?.join(", ")}</p>
        <p><strong>Total a pagar:</strong> ${datos.mesesSeleccionados?.length * 500 || 0} MXN</p>

        <button onClick={confirmar} style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4ADE80",
          color: "#0D1117",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          Ver vista previa del documento
        </button>
      </div>
    </div>
  );
}
