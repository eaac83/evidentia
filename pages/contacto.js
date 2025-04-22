export default function Contacto() {
  return (
    <div style={{
      backgroundColor: '#121d2f',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: "url('/logo-triada.png')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '300px',
      opacity: 0.95
    }}>
      <div style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: '40px', borderRadius: '12px', maxWidth: '500px', width: '100%' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#fff', textAlign: 'center' }}>Contáctanos</h1>
        <p style={{ marginBottom: '10px', color: '#ccc', textAlign: 'center' }}>Ubicación: Nuevo León, México</p>
        <form action="https://formsubmit.co/admin@jarsoluciones.com" method="POST" style={{ display: 'flex', flexDirection: 'column' }}>
          <input type="text" name="name" placeholder="Tu nombre" required style={inputStyle} />
          <input type="email" name="email" placeholder="Tu correo electrónico" required style={inputStyle} />
          <textarea name="message" placeholder="Mensaje" rows="5" required style={inputStyle}></textarea>
          <button type="submit" style={buttonStyle}>Enviar mensaje</button>
        </form>
        <a href="https://wa.me/5215654316062" target="_blank" rel="noopener noreferrer" style={{ marginTop: '20px', display: 'block', textAlign: 'center', color: '#25D366' }}>
          Envíanos un mensaje por WhatsApp
        </a>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#2ea043',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};