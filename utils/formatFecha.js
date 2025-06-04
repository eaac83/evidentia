export function formatFecha(fecha) {
  if (!fecha) return "";
  const partes = fecha.split("-");
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

