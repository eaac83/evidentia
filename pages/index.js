
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Triada Empresarial</title>
      </Head>

      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background-color: #0f1115;
          color: #f1f1f1;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          background-color: #1c1f26;
          border-bottom: 1px solid #2e2e2e;
        }

        nav a {
          margin-left: 25px;
          color: #a8b3cf;
          text-decoration: none;
          font-weight: 500;
        }

        nav a:hover {
          color: #ffffff;
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .main-banner {
          text-align: center;
          padding: 100px 20px 50px;
          background: linear-gradient(to right, #1a1d24, #121417);
        }

        .main-banner h1 {
          font-size: 42px;
          color: #ffffff;
          margin-bottom: 10px;
        }

        .main-banner p {
          font-size: 18px;
          color: #c2c8d7;
        }

        .section {
          max-width: 1000px;
          margin: 40px auto;
          background-color: #1c1f26;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 0 12px rgba(0,0,0,0.3);
        }

        .section h2 {
          color: #8ec8ff;
          font-size: 22px;
          margin-bottom: 15px;
        }

        .section p {
          color: #d0d6e0;
          line-height: 1.6;
        }
      `}</style>

      <header>
        <div className="logo">
          <Image src="/logo-triada.png" alt="Logo Triada" width={50} height={50} />
        </div>
        <nav>
          <a href="/">Inicio</a>
          <a href="#">Nosotros</a>
          <a href="#">Servicios</a>
          <a href="#">Contacto</a>
          <a href="/formulario" style={{ color: "#00ffb3" }}>Acceso Clientes</a>
        </nav>
      </header>

      <section className="main-banner">
        <h1>Soluciones Integrales para tu Empresa</h1>
        <p>Servicios contables, fiscales, administrativos y legales con tecnología, precisión y respaldo profesional.</p>
      </section>

      <section className="section">
        <h2>¿Quiénes somos?</h2>
        <p>Somos una firma multidisciplinaria especializada en brindar soluciones integrales en materia contable, fiscal, administrativa y legal. Acompañamos a nuestros clientes desde la planeación estratégica hasta la ejecución operativa de sus obligaciones fiscales y corporativas.</p>
      </section>

      <section className="section">
        <h2>Misión</h2>
        <p>Ofrecer servicios profesionales de excelencia en materia contable, fiscal y administrativa, con un enfoque centrado en la ética, la confidencialidad y la eficiencia. Nos comprometemos a generar valor sostenible para nuestros clientes mediante soluciones prácticas, actualizadas y adaptadas al entorno normativo y empresarial.</p>
      </section>

      <section className="section">
        <h2>Visión</h2>
        <p>Ser la firma de referencia a nivel nacional en servicios integrales para empresas y profesionistas, consolidando un ecosistema de soluciones altamente confiables, automatizadas y estratégicamente diseñadas para fortalecer la operación, crecimiento y cumplimiento de nuestros clientes.</p>
      </section>

      <section className="section">
        <h2>Valor Agregado</h2>
        <p>Nuestra propuesta de valor no se limita a la prestación de servicios tradicionales. Integramos inteligencia artificial, automatización documental y metodologías operativas especializadas para entregar resultados precisos, auditables y listos para inspección. La experiencia multidisciplinaria del equipo de Triada Empresarial nos permite anticipar necesidades, reducir riesgos fiscales y brindar evidencia sólida para cualquier revisión o validación externa. Además, nuestros procesos están diseñados para generar soporte documental en tiempo real, con respaldo legal y técnico.</p>
      </section>
    </>
  );
}
