import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { getActiveServices } from "../../api/servicesAPI.js";

// Usamos la variable de entorno, si no existe, usamos localhost por defecto
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const Reservas = ({ modalAbierto, setModalAbierto, sucursalPrevia, servicioPrevio }) => {
  // Estados para los datos
  const [sucursalesApi, setSucursalesApi] = useState([]);
  const [especialistasApi, setEspecialistasApi] = useState([]);
  const [serviciosApi, setServiciosApi] = useState([]);

  // Estados del formulario
  const [especialistaSel, setEspecialistaSel] = useState('');
  const [sucursalSel, setSucursalSel] = useState('');
  const [servicioSel, setServicioSel] = useState('');
  const [fechaHora, setFechaHora] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [consentimiento, setConsentimiento] = useState(false);

  const [enviando, setEnviando] = useState(false);
  const [mensajeOk, setMensajeOk] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [bloquesOcupados, setBloquesOcupados] = useState([]);

  // 1. Cargar datos desde la API (La conexión que quitamos)
  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const data = await getActiveServices();

        setServiciosApi(data);

        if (data.length > 0 && !servicioPrevio) {
          setServicioSel(data[0].id);
        }
      }
      catch (e) {
        console.error('No se pudieron cargar los servicios:', e);
        setErrorMsg('No se pudo conectar con el servidor de reservas.');
      }

    }
    const cargarApi = async () => {
      try {
        const [rSuc, rEsp] = await Promise.all([
          axios.get(`${API_URL}/sucursales/`),
          axios.get(`${API_URL}/especialistas/`),

        ]);
        setSucursalesApi(rSuc.data);
        setEspecialistasApi(rEsp.data);
      } catch (e) {
        console.error('No se pudieron cargar sedes y especialistas:', e);
        setErrorMsg('No se pudo conectar con el servidor de reservas.');
      }
    };
    if (modalAbierto) cargarApi(), cargarServicios();
  }, [modalAbierto, servicioPrevio]);

  // 2. Efecto para preseleccionar la sucursal
  useEffect(() => {
    const temporizador = setTimeout(() => {
      if (sucursalPrevia) setSucursalSel(sucursalPrevia);
    }, 0);
    return () => clearTimeout(temporizador);
  }, [sucursalPrevia, modalAbierto]);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      if (servicioPrevio) setServicioSel(servicioPrevio);
    }, 0);
    return () => clearTimeout(temporizador);
  }, [servicioPrevio, modalAbierto]);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      if (!especialistaSel || !fechaHora) {
        setBloquesOcupados([]);
        return;
      }
      const fecha = fechaHora.slice(0, 10);
      axios.get(`${API_URL}/citas/disponibilidad/`, {
        params: { especialista: especialistaSel, fecha },
        withCredentials: true,
      }).then((response) => {
        setBloquesOcupados(response.data.bloques_ocupados || []);
      }).catch(() => {
        setBloquesOcupados([]);
      });
    }, 0);
    return () => clearTimeout(temporizador);
  }, [especialistaSel, fechaHora]);


  // 3. Enviar la cita a Django (El POST que quitamos)
  const handleConfirmarCita = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setMensajeOk(null);

    if (!consentimiento) {
      setErrorMsg('Debes aceptar el consentimiento expreso (Ley N.° 21.719).');
      return;
    }

    setEnviando(true);
    try {
      const nombreLimpio = nombre.replace(/[0-9]/g, '').trim();
      const telefonoLimpio = telefono.replace(/\D/g, '');
      if (!nombreLimpio || nombreLimpio.length < 3) {
        setErrorMsg('Ingrese un nombre válido con solo letras.');
        setEnviando(false);
        return;
      }
      const telefonoChileno = `+${telefonoLimpio}`;
      if (!/^\+569[0-9]{8}$/.test(telefonoChileno)) {
        setErrorMsg('Ingrese un teléfono chileno con formato +569 seguido de 8 dígitos.');
        setEnviando(false);
        return;
      }
      const fechaSeleccionada = new Date(fechaHora);
      if (Number.isNaN(fechaSeleccionada.getTime()) || fechaSeleccionada <= new Date()) {
        setErrorMsg('Seleccione una fecha y hora futuras.');
        setEnviando(false);
        return;
      }
      const horaSeleccionada = fechaHora.slice(11, 16);
      if (bloquesOcupados.includes(horaSeleccionada)) {
        setErrorMsg('Ese horario ya está ocupado. Seleccione otro turno.');
        setEnviando(false);
        return;
      }
      // Aquí intentamos enviarlo al backend real
      const payload = {
        cliente_nombre: nombreLimpio,
        cliente_telefono: telefonoChileno,
        cliente_correo: correo,
        especialista: Number(especialistaSel),
        sucursal: Number(sucursalSel),
        servicio: Number(servicioSel),
        fecha_hora: new Date(fechaHora).toISOString(),
        consentimiento_aceptado: consentimiento,
        version_politica: 'v1.0-2026',
      };

      const res = await axios.post(`${API_URL}/citas/`, payload, { withCredentials: true });

      setMensajeOk(`¡Cita #${res.data.id} agendada con ${res.data.especialista_nombre} en ${res.data.sucursal_nombre}!`);
    } catch (err) {
      if (err.response?.status === 409) {
        setErrorMsg(err.response.data.detail || err.response.data.error || 'El horario ya está ocupado.');
      } else {
        setErrorMsg(err.response?.data?.detail || 'No fue posible guardar la reserva.');
      }
    } finally {
      setEnviando(false);
    }
  };

  // Los estilos se mantienen igual para que se vea bonito
  const styles = {
    backdrop: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(5px)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
    box: { backgroundColor: '#181a1f', border: '1px solid #333', borderRadius: '16px', width: '100%', maxWidth: '500px', padding: '30px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '15px' },
    label: { fontSize: '0.85rem', color: '#c9a227', fontWeight: 'bold' },
    input: { background: '#0d0d0d', border: '1px solid #333', padding: '12px', borderRadius: '8px', color: '#f5f1e8', fontFamily: 'inherit', outline: 'none' },
    button: { background: '#c9a227', color: '#000', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', width: '100%', marginTop: '10px' },
    consent: { display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#111318', padding: '15px', borderRadius: '8px', marginBottom: '15px' }
  };

  if (!modalAbierto) return null;

  return (
    <div style={styles.backdrop} onClick={(e) => { if (e.target === e.currentTarget) setModalAbierto(false); }}>
      <div style={styles.box}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#c9a227', margin: 0 }}>Reservar Cita en Línea</h2>
          <button onClick={() => setModalAbierto(false)} style={{ background: 'transparent', border: 'none', color: '#b8c3cc', cursor: 'pointer' }}><X size={24} /></button>
        </div>

        <form onSubmit={handleConfirmarCita}>
          {/* Los selects ahora usan las variables de la API o las de prueba */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Sucursal (Atelier)</label>
            <select style={styles.input} value={sucursalSel} onChange={(e) => {
              setSucursalSel(e.target.value);
              setEspecialistaSel('');
            }} required>
              <option value="">Seleccione una sucursal...</option>
              {sucursalesApi.map((s) => <option key={s.id} value={s.id}>{s.comuna} — {s.nombre}</option>)}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Especialista</label>
            <select style={styles.input} value={especialistaSel} onChange={(e) => setEspecialistaSel(e.target.value)} required>
              <option value="">Seleccione un especialista...</option>
              {especialistasApi
                .filter((e) => !sucursalSel || String(e.sucursal) === String(sucursalSel))
                .map((e) => <option key={e.id} value={e.id}>{e.nombre_completo} ({e.sucursal_comuna})</option>)}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Servicio</label>
            <select style={styles.input} value={servicioSel} onChange={(e) => setServicioSel(e.target.value)} required>
              <option value="">Seleccione un servicio...</option>
              {serviciosApi.map((srv) => <option key={srv.id} value={srv.id}>{srv.nombre} — {srv.duracion_minutos} min (${srv.precio.toLocaleString('es-CL')})</option>)}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Fecha y Hora</label>
            <input style={styles.input} type="datetime-local" value={fechaHora} onChange={(e) => setFechaHora(e.target.value)} required />
            {bloquesOcupados.length > 0 && (
              <span style={{ color: '#eab32e', fontSize: '0.78rem', marginTop: '5px' }}>
                Horarios ocupados: {bloquesOcupados.join(', ')}
              </span>
            )}
          </div>
          <div style={styles.inputGroup}><label style={styles.label}>Nombre Completo</label><input style={styles.input} type="text" placeholder="Ej: Juan Pérez" value={nombre} onChange={(e) => setNombre(e.target.value)} required /></div>
          <div style={styles.inputGroup}><label style={styles.label}>Teléfono Móvil</label><input style={styles.input} type="tel" placeholder="+56 9 8765 4321" value={telefono} onChange={(e) => setTelefono(e.target.value)} required /></div>
          <div style={styles.inputGroup}><label style={styles.label}>Correo Electrónico</label><input style={styles.input} type="email" placeholder="cliente@correo.cl" value={correo} onChange={(e) => setCorreo(e.target.value)} required /></div>

          <div style={styles.consent}>
            <input type="checkbox" id="consent-ley" checked={consentimiento} onChange={(e) => setConsentimiento(e.target.checked)} style={{ marginTop: '3px', cursor: 'pointer' }} />
            <label htmlFor="consent-ley" style={{ fontSize: '0.8rem', color: '#b8c3cc', cursor: 'pointer', lineHeight: '1.4' }}>
              <ShieldCheck size={14} style={{ display: 'inline', color: '#c9a227', verticalAlign: 'text-bottom' }} /> Acepto el tratamiento de mis datos personales conforme a la <strong>Ley N.° 21.719</strong>.
            </label>
          </div>

          <button type="submit" style={styles.button} disabled={enviando}>{enviando ? 'VERIFICANDO...' : 'CONFIRMAR RESERVA'}</button>
        </form>

        {errorMsg && <div style={{ background: '#ffdad6', color: '#410002', padding: '10px', borderRadius: '8px', marginTop: '15px', fontSize: '0.85rem' }}>{errorMsg}</div>}
        {mensajeOk && <div style={{ background: '#d1ebdd', color: '#0d3522', padding: '10px', borderRadius: '8px', marginTop: '15px', fontSize: '0.85rem' }}><CheckCircle2 size={16} style={{ display: 'inline', marginRight: '5px' }} /> {mensajeOk}</div>}
      </div>
    </div>
  );
};

export default Reservas;