
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#0D1117', color: '#F3F4F6', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #30363d' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Triada Empresarial</div>
        <nav>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>Servicios ▾</span>
            <ul style={{ position: 'absolute', backgroundColor: '#1F2937', listStyle: 'none', marginTop: '10px', padding: '10px', borderRadius: '6px', display: 'none' }} className="menu-dropdown">
              <li><a href="#" style={{ color: '#F3F4F6', textDecoration: 'none' }}>Materialidad y soporte documental</a></li>
              <li><a href="#" style={{ color: '#F3F4F6', textDecoration: 'none' }}>Servicios de contabilidad</a></li>
              <li><a href="#" style={{ color: '#F3F4F6', textDecoration: 'none' }}>Maquila de nómina</a></li>
              <li><a href="#" style={{ color: '#F3F4F6', textDecoration: 'none' }}>Otros servicios de apoyo a los negocios</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px' }}>
        <section style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Nuestra Historia</h1>
          <p style={{ fontSize: '18px' }}>
            Triada Empresarial nace como respuesta a una necesidad real: brindar soporte documental sólido y confiable a empresas que buscan blindar sus operaciones. A lo largo de múltiples proyectos desarrollados con precisión, hemos acompañado a nuestros clientes con soluciones fiscales, contables y de cumplimiento, logrando evidencia robusta ante cualquier revisión o auditoría. Nuestro camino ha sido construido sobre experiencia, conocimiento técnico y una atención personalizada que entiende las particularidades de cada empresa.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>¿Quiénes somos?</h2>
          <p style={{ fontSize: '18px' }}>
            Somos una firma de consultoría especializada en la elaboración de materialidad y soporte documental, contabilidad para personas físicas y morales, y maquila de nómina. Nuestro equipo está conformado por expertos con más de una década de experiencia en materia fiscal y operativa, lo que nos permite ofrecer soluciones sólidas y estratégicas.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Visión</h2>
          <p style={{ fontSize: '18px' }}>
            Ser reconocidos como la firma referente en soporte documental empresarial, respaldando con excelencia la integridad, legalidad y eficiencia de nuestros clientes.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Misión</h2>
          <p style={{ fontSize: '18px' }}>
            Acompañar y fortalecer a las empresas mediante servicios especializados de evidencia documental, contabilidad y cumplimiento fiscal, ofreciendo herramientas que garanticen seguridad operativa y tranquilidad tributaria.
          </p>
        </section>

        <Link href="pages/formulario.js">
          <a style={{
            padding: '12px 24px',
            backgroundColor: '#4ADE80',
            color: '#0D1117',
            borderRadius: '6px',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}>
            Solicitar soporte documental
          </a>
        </Link>
      </main>
    </div>
  );
}
