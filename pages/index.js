export default function Home() {
  return (
    <div style={{
      backgroundColor: '#0D1117',
      color: '#F3F4F6',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'sans-serif'
    }}>
      <h1>✅ Evidentia está en línea</h1>
      <a href="/formulario" style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#4ADE80',
        color: '#0D1117',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}>Ir al Formulario</a>
    </div>
  );
}
