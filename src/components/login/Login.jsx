import { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';

export const Login = ({ modalAbierto, setModalAbierto }) => {
  const [esRegistro, setEsRegistro] = useState(false); // Para alternar entre Login y Registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState(''); // Solo se usa en registro
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulamos la autenticación
    setMensaje(esRegistro ? '¡Cuenta creada con éxito!' : '¡Bienvenido de vuelta!');
    setTimeout(() => {
      setMensaje(null);
      setModalAbierto(false);
    }, 1500);
  };

  const styles = {
    backdrop: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(5px)',
      zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
    },
    box: {
      backgroundColor: '#181a1f', border: '1px solid #333', borderRadius: '16px',
      width: '100%', maxWidth: '400px', padding: '40px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative'
    },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' },
    label: { fontSize: '0.85rem', color: '#c9a227', fontWeight: 'bold' },
    inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
    icon: { position: 'absolute', left: '12px', color: '#888' },
    input: {
      width: '100%', background: '#0d0d0d', border: '1px solid #333', padding: '12px 12px 12px 40px',
      borderRadius: '8px', color: '#f5f1e8', fontFamily: 'inherit', outline: 'none'
    },
    button: {
      background: '#c9a227', color: '#000', border: 'none', padding: '15px',
      borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer',
      width: '100%', marginTop: '10px'
    },
    toggleText: {
      textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#b8c3cc'
    },
    link: {
      color: '#c9a227', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline'
    }
  };

  if (!modalAbierto) return null;

  return (
    <div style={styles.backdrop} onClick={(e) => { if (e.target === e.currentTarget) setModalAbierto(false); }}>
      <div style={styles.box}>
        
        {/* Botón de cerrar */}
        <button onClick={() => setModalAbierto(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: '#b8c3cc', cursor: 'pointer' }}>
          <X size={24} />
        </button>

        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: '#f5f1e8', margin: '0 0 10px 0', textAlign: 'center' }}>
          {esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </h2>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '0.9rem', marginBottom: '30px' }}>
          {esRegistro ? 'Únete al Club VIP de BarberClub' : 'Accede a tu cuenta para gestionar tus citas'}
        </p>

        <form onSubmit={handleSubmit}>
          
          {esRegistro && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nombre Completo</label>
              <div style={styles.inputWrapper}>
                <User size={18} style={styles.icon} />
                <input style={styles.input} type="text" placeholder="Ej: Marc González" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              </div>
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Correo Electrónico</label>
            <div style={styles.inputWrapper}>
              <Mail size={18} style={styles.icon} />
              <input style={styles.input} type="email" placeholder="cliente@correo.cl" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.icon} />
              <input style={styles.input} type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>

          <button type="submit" style={styles.button}>
            {esRegistro ? 'REGISTRARSE' : 'INGRESAR'}
          </button>
        </form>

        {mensaje && (
          <div style={{ background: '#d1ebdd', color: '#0d3522', padding: '12px', borderRadius: '8px', marginTop: '20px', fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>
            {mensaje}
          </div>
        )}

        <div style={styles.toggleText}>
          {esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <span style={styles.link} onClick={() => { setEsRegistro(!esRegistro); setMensaje(null); }}>
            {esRegistro ? 'Inicia Sesión aquí' : 'Regístrate aquí'}
          </span>
        </div>

      </div>
    </div>
  );
};

export default Login;