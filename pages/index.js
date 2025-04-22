import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#0d1117', color: '#e0e0e0' }}>
      <Head>
        <title>Triada Empresarial</title>
      </Head>

      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        backgroundColor: '#161b22',
        borderBottom: '1px solid #30363d',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div>
          <img src="/logo-triada.png" alt="Logo Triada" style={{ height: '40px' }} />
        </div>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link href="/">Inicio</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/formulario"><span style={{ color: '#00ff99' }}>Acceso Clientes</span></Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(to right, #1f2937, #111827)',
        padding: '100px 40px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Soluciones Integrales para tu Empresa</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          Servicios contables, fiscales, administrativos y legales con tecnología, precisión y respaldo profesional.
        </p>
      </section>

      {/* Sección quiénes somos */}
      <section style={{ padding: '60px 40px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2>¿Quiénes somos?</h2>
          <p>
            Somos una firma multidisciplinaria especializada en brindar soluciones integrales en materia contable, fiscal, administrativa y legal.
            Acompañamos a nuestros clientes desde la planeación estratégica hasta la ejecución operativa de sus obligaciones fiscales y corporativas.
          </p>
        </div>
        <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
          <img src="/logo-triada.png" alt="Triada Empresarial" style={{ maxWidth: '200px', opacity: 0.2 }} />
        </div>
      </section>
    </div>
  );
}