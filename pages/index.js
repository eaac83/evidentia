import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', color: '#e0e0e0', padding: '40px' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo-triada.png" alt="Triada Empresarial" style={{ height: '60px', marginRight: '20px' }} />
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Triada Empresarial</h1>
        </div>
        <nav>
          <Link href="/" style={navLink}>Inicio</Link>
          <Link href="/nosotros" style={navLink}>Nosotros</Link>
          <Link href="/servicios" style={navLink}>Servicios</Link>
          <Link href="/contacto" style={navLink}>Contacto</Link>
          <Link href="/login" style={{ ...navLink, color: '#2ea043' }}>Acceso Clientes</Link>
        </nav>
      </header>

      <section style={cardStyle}>
        <h2 style={titleStyle}>¿Quiénes somos?</h2>
        <p style={textStyle}>
          Somos una firma multidisciplinaria especializada en brindar soluciones integrales en materia contable, fiscal, administrativa y legal. Acompañamos a nuestros clientes desde la planeación estratégica hasta la ejecución operativa de sus obligaciones fiscales y corporativas.
        </p>
      </section>

      <section style={cardStyle}>
        <h2 style={titleStyle}>Misión</h2>
        <p style={textStyle}>
          Ofrecer servicios profesionales de excelencia en materia contable, fiscal y administrativa, con un enfoque centrado en la ética, la confidencialidad y la eficiencia. Nos comprometemos a generar valor sostenible para nuestros clientes mediante soluciones prácticas, actualizadas y adaptadas al entorno normativo y empresarial.
        </p>
      </section>

      <section style={cardStyle}>
        <h2 style={titleStyle}>Visión</h2>
        <p style={textStyle}>
          Ser la firma de referencia a nivel nacional en servicios integrales para empresas y profesionistas, consolidando un ecosistema de soluciones altamente confiables, automatizadas y estratégicamente diseñadas para fortalecer la operación, crecimiento y cumplimiento de nuestros clientes.
        </p>
      </section>

      <section style={cardStyle}>
        <h2 style={titleStyle}>Valor Agregado</h2>
        <p style={textStyle}>
          Nuestra propuesta de valor no se limita a la prestación de servicios tradicionales. Integramos inteligencia artificial, automatización documental y metodologías operativas especializadas para entregar resultados precisos, auditables y listos para inspección. La experiencia multidisciplinaria del equipo de Triada Empresarial nos permite anticipar necesidades, reducir riesgos fiscales y brindar evidencia sólida para cualquier revisión o validación externa. Además, nuestros procesos están diseñados para generar soporte documental en tiempo real, con respaldo legal y técnico.
        </p>
      </section>
    </div>
  );
}

const navLink = {
  marginLeft: '20px',
  fontSize: '1rem',
  color: '#e0e0e0',
  textDecoration: 'none'
};

const cardStyle = {
  backgroundColor: '#161b22',
  borderRadius: '12px',
  padding: '30px',
  marginBottom: '30px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
};

const titleStyle = {
  fontSize: '1.5rem',
  color: '#58a6ff',
  marginBottom: '12px'
};

const textStyle = {
  fontSize: '1rem',
  lineHeight: '1.6',
  textAlign: 'justify',
  color: '#c9d1d9'
};