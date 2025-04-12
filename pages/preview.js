
export default function Preview() {
  const datos = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("formularioData") || "{}") : {};

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0D1117",
      color: "white",
      padding: "40px",
      fontFamily: "serif"
    }}>
      <div style={{
        backgroundColor: "white",
        color: "black",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "50px",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize: "12px",
          fontWeight: "bold",
          color: "#999"
        }}>
          VERSIÓN PRELIMINAR - PENDIENTE DE PAGO
        </div>

        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Soporte Documental de Servicio</h1>
        <p><strong>Proveedor:</strong> {datos.proveedor}</p>
        <p><strong>Receptor:</strong> {datos.receptor}</p>
        <p><strong>Servicio:</strong> {datos.descripcionSAT}</p>
        <p><strong>Detalle:</strong> {datos.detalleServicio}</p>
        <p><strong>Meses trabajados:</strong> {datos.mesesSeleccionados?.join(", ")}</p>

        <div style={{ marginTop: "30px", lineHeight: "1.8" }}>
          <p>Por medio del presente documento, se hace constar que durante los meses señalados se realizó el servicio conforme a lo estipulado en la cotización aceptada.</p>
          <p>Este documento forma parte del soporte documental correspondiente a los servicios registrados mediante el CFDI emitido por el proveedor.</p>
        </div>
      </div>
    </div>
  );
}
