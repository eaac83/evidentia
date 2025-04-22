export default function Contacto() {
  return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '40px', color: '#fff' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Contáctanos</h1>
      <p style={{ marginBottom: '10px' }}>Ubicación: Nuevo León, México</p>
      <form action="https://formsubmit.co/admin@jarsoluciones.com" method="POST" style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}>
        <input type="text" name="name" placeholder="Tu nombre" required style={inputStyle} />
        <input type="email" name="email" placeholder="Tu correo electrónico" required style={inputStyle} />
        <textarea name="message" placeholder="Mensaje" rows="5" required style={inputStyle}></textarea>
        <button type="submit" style={buttonStyle}>Enviar mensaje</button>
      </form>
      <a href="https://wa.me/5215654316062" target="_blank" rel="noopener noreferrer" style={{ marginTop: '20px', display: 'inline-block', color: '#25D366' }}>
        Envíanos un mensaje por WhatsApp
      </a>
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