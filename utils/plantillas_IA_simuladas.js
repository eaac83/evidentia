export function obtenerTextoSimuladoIA(descripcionSAT) {
  const desc = descripcionSAT.toLowerCase();
  if (desc.includes('contabilidad')) return `El presente servicio tiene como objetivo realizar un análisis detallado de los costos de producción, facilitando el control, acumulación e información contable para una adecuada toma de decisiones financieras.`;
  if (desc.includes('gerencia de proyectos')) return `Este servicio comprende la planificación, evaluación y administración técnica de proyectos, incluyendo estudios de factibilidad y el seguimiento técnico conforme a los objetivos establecidos por el cliente.`;
  if (desc.includes('consultoría')) return `Se brinda asesoría estratégica enfocada en mejorar la eficiencia institucional, fortaleciendo la administración corporativa, la toma de decisiones y el desempeño gerencial.`;
  if (desc.includes('administración de proyectos')) return `El servicio incluye la gestión operativa y estructural de proyectos o programas urbanos, brindando seguimiento a las metas, recursos y entregables pactados.`;
  if (desc.includes('legales')) return `Este servicio proporciona asesoría y acompañamiento en la elaboración, revisión o negociación de contratos, conforme al marco legal aplicable.`;
  if (desc.includes('construcción')) return `Se ofrecen servicios complementarios para el apoyo técnico en obras de construcción, facilitando la ejecución y cumplimiento normativo en campo.`;
  if (desc.includes('mercadotecnia')) return `Se realiza un análisis integral del mercado mediante investigación cualitativa y cuantitativa, con el fin de identificar oportunidades comerciales, comportamientos de consumo y posicionamiento competitivo.`;
  if (desc.includes('cadenas de suministro')) return `A través de este servicio se diagnostican procesos logísticos, desde abastecimiento hasta inventarios, generando estrategias para optimizar la cadena de suministro y reducir tiempos y costos.`;
  if (desc.includes('limpieza')) return `El servicio incluye actividades de limpieza, conservación y mantenimiento preventivo de instalaciones físicas, garantizando condiciones óptimas de higiene y funcionamiento.`;
  if (desc.includes('logística')) return `Se analizan procesos de transporte, distribución y tránsito logístico con el fin de reducir cuellos de botella, mejorar la eficiencia de entrega y optimizar recursos físicos.`;
  return `Este servicio incluye actividades profesionales diseñadas para cumplir con los objetivos operativos y técnicos establecidos entre las partes, conforme a los términos contratados.`;
}
