import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Award, Calendar, CheckCircle2, Clock, Coffee, MapPin,
  Phone, ShieldCheck, Sparkles, UserCheck, AlertTriangle, Car
} from 'lucide-react';

const API_URL = 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  const csrfCookie = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('csrftoken='));
  if (csrfCookie) config.headers['X-CSRFToken'] = decodeURIComponent(csrfCookie.split('=')[1]);
  return config;
});

const SEDES_INFO = [
  {
    comuna: 'Las Condes',
    nombre: 'El Golf',
    tag: 'PRIME VIP',
    direccion: 'Av. Isidora Goyenechea 3120, Penthouse',
    horario: 'Lunes a Sábado: 09:00 – 21:00 | Domingos Cerrado',
    telefono: '+56 2 2480 9101 · Concierge El Golf',
    desc: 'Nuestro atelier insignia en el corazón financiero. Terraza privada, bar de single malts y cabinas VIP insonorizadas.',
    mapa: 'https://www.google.com/maps?q=Av.+Isidora+Goyenechea+3120,+Las+Condes,+Chile&output=embed',
  },
  {
    comuna: 'Vitacura',
    nombre: 'Alonso de Córdova',
    tag: 'BOUTIQUE',
    direccion: 'Av. Alonso de Córdova 3890',
    horario: 'Lunes a Sábado: 09:30 – 20:30 | Domingos Cerrado',
    telefono: '+56 2 2480 9102 · Concierge Vitacura',
    desc: 'Espacio de diseño vanguardista especializado en alta colorimetría unisex, visagismo y rituales botánicos.',
    mapa: 'https://www.google.com/maps?q=Av.+Alonso+de+Cordova+3890,+Vitacura,+Chile&output=embed',
  },
  {
    comuna: 'Providencia',
    nombre: 'Pedro de Valdivia',
    tag: 'HERITAGE',
    direccion: 'Av. Pedro de Valdivia 1450',
    horario: 'Lunes a Sábado: 09:00 – 21:00 | Domingos Cerrado',
    telefono: '+56 2 2480 9103 · Concierge Providencia',
    desc: 'Casona de conservación arquitectónica restaurada para ofrecer la barbería clásica de 1920 y salón unisex.',
    mapa: 'https://www.google.com/maps?q=Av.+Pedro+de+Valdivia+1450,+Providencia,+Chile&output=embed',
  },
  {
    comuna: 'Lo Barnechea',
    nombre: 'La Dehesa',
    tag: 'PENTHOUSE',
    direccion: 'Av. La Dehesa 1844, Nivel 2',
    horario: 'Lunes a Sábado: 09:30 – 20:30 | Domingos Cerrado',
    telefono: '+56 2 2480 9104 · Concierge La Dehesa',
    desc: 'Privacidad absoluta en el sector oriente alto con valet parking subterráneo y terapia capilar orgánica.',
    mapa: 'https://www.google.com/maps?q=Av.+La+Dehesa+1844,+Lo+Barnechea,+Chile&output=embed',
  },
];

const CATALOGO_SERVICIOS = [
  {
    nombre: 'Corte Clásico & Perfilado',
    badge: 'SIGNATURE',
    duracion: 30,
    precio: 18000,
    categoria: 'MASCULINO',
    desc: 'Diagnóstico capilar y morfológico personalizado, corte a tijera y navaja con acabado de precisión.',
    foto: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80',
  },
  {
    nombre: 'Corte + Ritual Barba Toalla Caliente',
    badge: 'RITUAL TRADICIÓN',
    duracion: 60,
    precio: 28000,
    categoria: 'MASCULINO',
    desc: 'Apertura de poros mediante toallas calientes infusionadas en eucalipto y cedro, afeitado a navaja y masaje facial.',
    foto: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
  },
  {
    nombre: 'Colorimetría / Estilismo Unisex',
    badge: 'EXPERIENCIA LUXE',
    duracion: 60,
    precio: 35000,
    categoria: 'FEMENINO',
    desc: 'Iluminación orgánica, visagismo de corte editorial en seco y húmedo, terapia gloss y brushing de larga duración.',
    foto: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
  },
  {
    nombre: 'BarberClub Ritual Integral Unisex',
    badge: 'EXPERIENCIA COMPLETA',
    duracion: 90,
    precio: 42000,
    categoria: 'TRATAMIENTO',
    desc: 'Corte de autor a medida, sesión de tratamiento capilar botánico profundo, masaje craneal shiatsu y styling.',
    foto: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
  },
  {
    nombre: 'Balayage & Babylights Couture',
    badge: 'CRÉATION D’ATELIER',
    duracion: 120,
    precio: 85000,
    categoria: 'FEMENINO',
    desc: 'Técnica francesa a mano alzada para crear transiciones de luz naturales con protección Plex.',
    foto: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80',
  },
  {
    nombre: 'Terapia Detox & Masaje Craneal',
    badge: 'WELLNESS',
    duracion: 45,
    precio: 30000,
    categoria: 'TRATAMIENTO',
    desc: 'Purificación profunda con fitoceramidas y aceites esenciales bajo vapor ozonizado.',
    foto: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80',
  },
];

const MAESTROS_LISTA = [
  {
    nombre: 'Sebastián Krause',
    comuna: 'Las Condes',
    local: 'El Golf',
    disciplina: 'BARBERIA',
    cargo: 'Maestro Barbero & Visagismo Facial',
    academia: 'Formado en Buenos Aires',
    exp: '12 años de experiencia',
    bio: 'Dominio de cortes crop texturizados, perfilado de patillas y barba con toalla caliente infusionada en cedro.',
    tags: ['Textured Crop', 'Tratamiento Barba', 'Ritual Toalla'],
    foto: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80',
  },
  {
    nombre: 'Valentina Restrepo',
    comuna: 'Vitacura',
    local: 'Alonso de Córdova',
    disciplina: 'UNISEX',
    cargo: 'Estilista Senior & Bob Architect',
    academia: 'Sassoon Academy London',
    exp: '11 años de trayectoria',
    bio: 'Arquitectura de cortes bob precisos, micro-flequillos y peinados para eventos de etiqueta con asesoría de visagismo.',
    tags: ['Precision Bob', 'Visagismo Óseo', 'Tratamientos Gloss'],
    foto: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80',
  },
  {
    nombre: 'Arturo Benavides',
    comuna: 'Providencia',
    local: 'Pedro de Valdivia',
    disciplina: 'BARBERIA',
    cargo: 'Barbero Tradicional & Masaje Craneal',
    academia: 'Maestro de la vieja escuela',
    exp: '16 años de trayectoria',
    bio: 'Maestría en ritual de afeitado con espuma tibia de brocha tejón y navaja Solingen, con masaje craneal.',
    tags: ['Afeitado Solingen', 'Shiatsu Craneal', 'Bigote Clásico'],
    foto: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
  },
  {
    nombre: 'Sofía Montalva',
    comuna: 'Lo Barnechea',
    local: 'La Dehesa',
    disciplina: 'UNISEX',
    cargo: 'Colorista & Terapeuta Capilar',
    academia: 'Especialista en Alisados Orgánicos',
    exp: '9 años de trayectoria',
    bio: 'Tratamientos botánicos de hidratación profunda bajo vapor ozonizado, fototerapia LED capilar y tonalizaciones.',
    tags: ['Fototerapia LED', 'Coloración Orgánica', 'Detox Capilar'],
    foto: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
  },
  {
    nombre: 'Don Vincenzo Morales',
    comuna: 'Las Condes',
    local: 'El Golf',
    disciplina: 'BARBERIA',
    cargo: 'Master Barber & Tradición Solingen',
    academia: 'Formación en Milán y Sevilla',
    exp: '22 años de trayectoria',
    bio: 'Especialista en afeitado imperial a navaja barbera clásica, degradados artesanales a peine y tijera.',
    tags: ['Afeitado a Navaja', 'Corte Clásico Tijera', 'Perfilado Imperial'],
    foto: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80',
  },
  {
    nombre: 'Camila Valenzuela',
    comuna: 'Vitacura',
    local: 'Alonso de Córdova',
    disciplina: 'UNISEX',
    cargo: 'Master Hair Colorist & Balayage Couture',
    academia: 'Certificación L’Oréal Professionnel París',
    exp: '14 años de trayectoria',
    bio: 'Pionera en técnicas de babylights a mano alzada, corrección de color compleja y cortes en capas.',
    tags: ['Balayage Couture', 'Visagismo Capilar', 'Terapia Plex'],
    foto: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
  },
  {
    nombre: 'Mateo Sandoval',
    comuna: 'Providencia',
    local: 'Pedro de Valdivia',
    disciplina: 'BARBERIA',
    cargo: 'Senior Barber & Especialista en Fades',
    academia: 'Barbershop World Tour Ambassador',
    exp: '10 años de trayectoria',
    bio: 'Experto en texturizado contemporáneo, low y mid fades con máquina cóncava y rituales de vapor.',
    tags: ['Skin Fade', 'Texturizado Urbano', 'Spa Facial'],
    foto: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80',
  },
  {
    nombre: 'Éléonore Dupont',
    comuna: 'Lo Barnechea',
    local: 'La Dehesa',
    disciplina: 'UNISEX',
    cargo: 'Directora Creativa & Maestra de Estilo',
    academia: 'Ex Atelier Jean Louis David París',
    exp: '18 años de trayectoria',
    bio: 'Referente en corte editorial en seco y húmedo, brushing de fijación prolongada y botánica regenerativa.',
    tags: ['Corte Editorial', 'Brushing Glam', 'Nutrición Botánica'],
    foto: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80',
  },
];

const DIAS_SEMANA = Array.from({ length: 14 }, (_, index) => {
  const fecha = new Date();
  fecha.setHours(12, 0, 0, 0);
  fecha.setDate(fecha.getDate() + index);
  if (fecha.getDay() === 0) fecha.setDate(fecha.getDate() + 1);
  const nombreDia = new Intl.DateTimeFormat('es-CL', { weekday: 'short' })
    .format(fecha)
    .replace('.', '')
    .toUpperCase();
  return {
    dia: nombreDia,
    num: String(fecha.getDate()).padStart(2, '0'),
    fechaISO: `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`,
  };
}).filter((dia, index, dias) => dias.findIndex((item) => item.fechaISO === dia.fechaISO) === index);

const BLOQUES_HORA = ['10:00', '11:30', '13:00', '15:30', '17:00', '18:30'];

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [authModo, setAuthModo] = useState('REGISTRARSE');
  const [authError, setAuthError] = useState('');
  const [authEnviando, setAuthEnviando] = useState(false);
  const [authForm, setAuthForm] = useState({
    firstName: '',
    username: '',
    email: '',
    telefono: '',
    password: '',
  });
  const [pagina, setPagina] = useState('INICIO'); // INICIO | SERVICIOS | MAESTROS | RESERVAR
  const [sedeInicioIdx, setSedeInicioIdx] = useState(2); // Providencia por defecto como en Stitch

  // Datos reales desde Django API
  const [sucursalesApi, setSucursalesApi] = useState([]);
  const [especialistasApi, setEspecialistasApi] = useState([]);
  const [serviciosApi, setServiciosApi] = useState([]);

  // Filtros en Maestros y Servicios
  const [filtroComuna, setFiltroComuna] = useState('TODAS');
  const [filtroDisc, setFiltroDisc] = useState('TODAS');
  const [filtroCatServicio, setFiltroCatServicio] = useState('TODAS');

  // Estado Página "Reserve su Cita Privada" (6 pasos + Hoja de Encargo)
  const [comunaReserva, setComunaReserva] = useState('Las Condes');
  const [servicioIdx, setServicioIdx] = useState(1);
  const [diaSel, setDiaSel] = useState(DIAS_SEMANA[3]);
  const [maestroNombre, setMaestroNombre] = useState('Sebastián Krause');
  const [horaSel, setHoraSel] = useState('17:00');
  const [clienteNombre, setClienteNombre] = useState('');
  const [clienteTel, setClienteTel] = useState('');
  const [clienteCorreo, setClienteCorreo] = useState('');
  const [consentimiento, setConsentimiento] = useState(false);

  const [enviando, setEnviando] = useState(false);
  const [reservaOk, setReservaOk] = useState(null);
  const [errorReserva, setErrorReserva] = useState('');
  const [sugerenciasVecinas, setSugerenciasVecinas] = useState(null);
  const [bloquesOcupados, setBloquesOcupados] = useState([]);
  const [resetUid, setResetUid] = useState('');
  const [resetToken, setResetToken] = useState('');

  const cargarSesion = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me/`);
      if (response.data.authenticated) {
        setUsuario(response.data);
        setClienteNombre(response.data.first_name || '');
        setClienteCorreo(response.data.email || '');
        setClienteTel(response.data.telefono || '');
      } else {
        setUsuario(null);
      }
    } catch {
      setUsuario(null);
    }
  };

  const gestionarSesion = () => {
    if (usuario) {
      setAuthModo('CERRAR');
      setAuthModal(true);
      return;
    }
    setAuthModo('INICIAR');
    setAuthError('');
    setAuthModal(true);
  };

  const cambiarAuthForm = (campo, valor) => {
    setAuthForm((actual) => ({ ...actual, [campo]: valor }));
  };

  const enviarAuth = async (event) => {
    event.preventDefault();
    setAuthError('');
    setAuthEnviando(true);
    try {
      if (authModo === 'RECUPERAR') {
        const response = await axios.post(`${API_URL}/auth/password-reset/`, {
          email: authForm.email,
          frontend_url: window.location.origin,
        });
        setAuthError('');
        window.alert(response.data.detail);
        setAuthModal(false);
        return;
      }
      if (authModo === 'RESTABLECER') {
        const response = await axios.post(`${API_URL}/auth/password-reset-confirm/`, {
          uid: resetUid,
          token: resetToken,
          password: authForm.password,
        });
        window.alert(response.data.detail);
        setAuthModo('INICIAR');
        setAuthModal(false);
        setResetUid('');
        setResetToken('');
        return;
      }
      const endpoint = authModo === 'REGISTRARSE' ? 'register' : 'login';
      const datos = authModo === 'REGISTRARSE'
        ? {
            first_name: authForm.firstName,
            username: authForm.username,
            email: authForm.email,
            telefono: authForm.telefono,
            password: authForm.password,
          }
        : {
            username: authForm.username,
            password: authForm.password,
          };
      const response = await axios.post(`${API_URL}/auth/${endpoint}/`, datos);
      setUsuario(response.data);
      setClienteNombre(response.data.first_name || '');
      setClienteCorreo(response.data.email || '');
      setClienteTel(response.data.telefono || '');
      setAuthModal(false);
      setAuthForm({ firstName: '', username: '', email: '', telefono: '', password: '' });
    } catch (error) {
      const detalle = error.response?.data?.detail;
      setAuthError(Array.isArray(detalle) ? detalle.join(' ') : (detalle || 'No fue posible procesar la solicitud.'));
    } finally {
      setAuthEnviando(false);
    }
  };

  const cerrarSesion = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout/`);
      setUsuario(null);
      setClienteNombre('');
      setClienteCorreo('');
      setClienteTel('');
      setAuthModal(false);
    } catch {
      setAuthError('No fue posible cerrar la sesión.');
    }
  };

  const cargarDatosApi = async () => {
    try {
      const [rSuc, rEsp, rSer] = await Promise.all([
        axios.get(`${API_URL}/sucursales/`),
        axios.get(`${API_URL}/especialistas/`),
        axios.get(`${API_URL}/servicios/`),
      ]);
      setSucursalesApi(rSuc.data);
      setEspecialistasApi(rEsp.data);
      setServiciosApi(rSer.data);
    } catch (e) {
      console.error('Error conectando con API Django:', e);
      setErrorReserva(
        'No fue posible conectar con el servidor Django. Verifica que esté ejecutándose en http://127.0.0.1:8000.'
      );
    }
  };

  useEffect(() => {
    const temporizador = window.setTimeout(() => {
      cargarDatosApi();
      cargarSesion();
      const parametros = new URLSearchParams(window.location.search);
      if (parametros.get('reset') === '1') {
        setResetUid(parametros.get('uid') || '');
        setResetToken(parametros.get('token') || '');
        setAuthModo('RESTABLECER');
        setAuthError('');
        setAuthModal(true);
      }
    }, 0);
    return () => window.clearTimeout(temporizador);
  }, []);

  useEffect(() => {
    const especialista = especialistasApi.find((item) => item.nombre_completo === maestroNombre);
    if (!especialista) return undefined;
    const temporizador = window.setTimeout(async () => {
      try {
        const response = await axios.get(`${API_URL}/citas/disponibilidad/`, {
          params: { especialista: especialista.id, fecha: diaSel.fechaISO },
        });
        setBloquesOcupados(response.data.bloques_ocupados || []);
        if ((response.data.bloques_ocupados || []).includes(horaSel)) {
          setHoraSel(BLOQUES_HORA.find((hora) => !(response.data.bloques_ocupados || []).includes(hora)) || horaSel);
        }
      } catch {
        setBloquesOcupados([]);
      }
    }, 0);
    return () => window.clearTimeout(temporizador);
  }, [diaSel, especialistasApi, maestroNombre, horaSel]);

  const irAReservar = ({ comuna, maestro, servicioNombre } = {}) => {
    if (comuna) setComunaReserva(comuna);
    if (maestro) setMaestroNombre(maestro);
    if (servicioNombre) {
      const idx = CATALOGO_SERVICIOS.findIndex((s) => s.nombre === servicioNombre);
      if (idx >= 0) setServicioIdx(idx);
    }
    setReservaOk(null);
    setErrorReserva('');
    setSugerenciasVecinas(null);
    setPagina('RESERVAR');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmarReserva = async (e) => {
    e.preventDefault();
    setErrorReserva('');
    setReservaOk(null);
    setSugerenciasVecinas(null);

    if (!consentimiento) {
      setErrorReserva('Debe marcar la casilla de consentimiento expreso conforme a la Ley N.° 21.719.');
      return;
    }

    const sucApi = sucursalesApi.find((s) => s.comuna === comunaReserva) || sucursalesApi[0];
    const espApi =
      especialistasApi.find((e) => e.nombre_completo === maestroNombre) ||
      especialistasApi.find((e) => e.sucursal === sucApi?.id) ||
      especialistasApi[0];
    const srvElegido = CATALOGO_SERVICIOS[servicioIdx];
    const srvApi =
      serviciosApi.find((s) => s.nombre === srvElegido.nombre) || serviciosApi[0];

    if (!sucApi || !espApi || !srvApi) {
      setErrorReserva('No se pudo sincronizar con los catálogos del servidor Django (puerto 8000).');
      return;
    }

    setEnviando(true);
    try {
      const isoFecha = new Date(`${diaSel.fechaISO}T${horaSel}:00`).toISOString();
      const res = await axios.post(`${API_URL}/citas/`, {
        cliente_nombre: clienteNombre,
        cliente_telefono: clienteTel,
        cliente_correo: clienteCorreo,
        sucursal: sucApi.id,
        especialista: espApi.id,
        servicio: srvApi.id,
        fecha_hora: isoFecha,
        consentimiento_aceptado: consentimiento,
        version_politica: 'v1.0-2026',
      });
      setReservaOk(
        `¡Cita #${res.data.id} confirmada en ${res.data.sucursal_nombre} con ${res.data.especialista_nombre} para el ${diaSel.dia} ${diaSel.num} a las ${horaSel} hrs!`
      );
      setBloquesOcupados((actuales) =>
        actuales.includes(horaSel) ? actuales : [...actuales, horaSel]
      );
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setSugerenciasVecinas(err.response.data.sugerencia_sucursal_cercana || []);
        setErrorReserva(
          err.response.data.detail ||
          'El horario seleccionado ya no está disponible.'
        );
      } else {
        setErrorReserva('Verifica los datos ingresados o la conexión con el Backend.');
      }
    } finally {
      setEnviando(false);
    }
  };

  const sedeActual = SEDES_INFO[sedeInicioIdx];
  const servicioActual = CATALOGO_SERVICIOS[servicioIdx];

  return (
    <div>
      {/* BARRA SUPERIOR UNIFICADA EN LAS 4 VISTAS */}
      <header className="navbar">
        <div className="brand-wrap" onClick={() => setPagina('INICIO')}>
          <div className="brand-icon">BC</div>
          <div>
            <div className="brand-title">BARBER CLUB &amp; BEAUTY</div>
            <div className="brand-sub">BARBERÍA &amp; PELUQUERÍA UNISEX</div>
          </div>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-item ${pagina === 'INICIO' ? 'active' : ''}`}
            onClick={() => setPagina('INICIO')}
          >
            Inicio
          </button>
          <button
            className={`nav-item ${pagina === 'SERVICIOS' ? 'active' : ''}`}
            onClick={() => setPagina('SERVICIOS')}
          >
            Servicios
          </button>
          <button
            className={`nav-item ${pagina === 'MAESTROS' ? 'active' : ''}`}
            onClick={() => setPagina('MAESTROS')}
          >
            Maestros
          </button>
          <button
            className="nav-item"
            onClick={() => {
              setPagina('INICIO');
              setTimeout(() => document.getElementById('sedes-sec')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }}
          >
            Locales
          </button>
        </nav>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button className="btn-dark" onClick={gestionarSesion}>
            {usuario ? usuario.username : 'INICIAR SESIÓN'}
          </button>
          <button className="btn-gold" onClick={() => irAReservar()}>
            <Calendar size={14} /> RESERVAR CITA
          </button>
        </div>
      </header>

      {/* =========================================================
          VISTA 1: INICIO (image_6a451b.jpg)
         ========================================================= */}
      {pagina === 'INICIO' && (
        <main className="page-wrap">
          <section className="home-hero">
            <div>
              <div className="badge-pill">● ATELIER UNISEX · BARBERÍA &amp; PELUQUERÍA</div>
              <h1>El Arte del Corte &amp; Estilismo Unisex de Élite</h1>
              <p>
                Una experiencia integral que fusiona la barbería clásica y la alta peluquería unisex:
                cortes de tendencia para damas y caballeros, coloración experta, spa capilar y afeitado
                artesanal en un entorno de máxima distinción y confort.
              </p>
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
                <button className="btn-gold" onClick={() => irAReservar()}>
                  RESERVAR EXPERIENCIA →
                </button>
                <button className="btn-dark" onClick={() => setPagina('SERVICIOS')}>
                  EXPLORAR SERVICIOS
                </button>
              </div>
              <div style={{ display: 'flex', gap: '2rem', fontSize: '0.82rem', color: '#d1d5db' }}>
                <div>
                  <span style={{ color: '#eab32e' }}>★★★★★</span> <strong>4.9 / 5.0</strong>
                  <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>+1.840 Clientes Unificados</div>
                </div>
                <div>
                  <Sparkles size={14} color="#eab32e" style={{ display: 'inline' }} />{' '}
                  <strong>Atención Con Reserva</strong>
                  <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>Gestión de turnos en vivo</div>
                </div>
              </div>
            </div>

            <div className="hero-card-img">
              <img
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
                alt="Ritual de Bienvenida"
              />
              <div className="hero-float-badge">
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>Ritual de Bienvenida</strong>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                    Whisky Single Malt · Cortesía
                  </div>
                </div>
                <span style={{ background: '#1e3a8a', color: '#93c5fd', fontSize: '0.7rem', padding: '0.2rem 0.55rem', borderRadius: '6px', fontWeight: 700 }}>
                  VIP
                </span>
              </div>
            </div>
          </section>

          {/* 4 Indicadores */}
          <section className="stats-row">
            <div className="stat-box">
              <div className="stat-top">
                <Award size={18} color="#eab32e" />
                <span className="stat-num">15+</span>
              </div>
              <strong>Años de Maestría</strong>
              <p style={{ fontSize: '0.76rem', color: '#9ca3af', marginTop: '0.3rem' }}>
                Tradición mediterránea e inglesa reinterpretada para profesionales exigentes.
              </p>
            </div>
            <div className="stat-box">
              <div className="stat-top">
                <Sparkles size={18} color="#eab32e" />
                <span className="stat-num">100%</span>
              </div>
              <strong>Agentes Orgánicos</strong>
              <p style={{ fontSize: '0.76rem', color: '#9ca3af', marginTop: '0.3rem' }}>
                Aceites esenciales prensados en frío, sin parabenos ni siliconas pesadas.
              </p>
            </div>
            <div className="stat-box">
              <div className="stat-top">
                <Coffee size={18} color="#eab32e" />
                <span className="stat-num">VIP</span>
              </div>
              <strong>Hospitalidad Exclusiva</strong>
              <p style={{ fontSize: '0.76rem', color: '#9ca3af', marginTop: '0.3rem' }}>
                Degustación de whisky escocés single malt y café arábiga de especialidad.
              </p>
            </div>
            <div className="stat-box">
              <div className="stat-top">
                <ShieldCheck size={18} color="#eab32e" />
                <span className="stat-num">0.1<small style={{ fontSize: '0.8rem' }}>mm</small></span>
              </div>
              <strong>Precisión Milimétrica</strong>
              <p style={{ fontSize: '0.76rem', color: '#9ca3af', marginTop: '0.3rem' }}>
                Cuchillas japonesas y navajas de acero japonés esterilizadas en calor seco.
              </p>
            </div>
          </section>

          {/* Rituales de Distinción y Cuidado */}
          <section style={{ marginBottom: '4rem' }}>
            <div className="section-head">
              <div>
                <div style={{ fontSize: '0.7rem', color: '#eab32e', letterSpacing: '1.5px', fontWeight: 700 }}>
                  LA CARTA DE TRATAMIENTOS
                </div>
                <h2>Rituales de Distinción y Cuidado</h2>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '0.85rem', maxWidth: '400px' }}>
                Procedimientos diseñados para renovar su presencia y salud capilar, combinando
                barbería tradicional con alta peluquería unisex.
              </p>
            </div>

            <div className="rituals-grid">
              {CATALOGO_SERVICIOS.slice(0, 4).map((srv) => (
                <div key={srv.nombre} className="ritual-card">
                  <div>
                    <span className="badge-pill" style={{ marginBottom: '0.6rem' }}>{srv.badge}</span>
                    <h3 className="font-serif" style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>
                      {srv.nombre}
                    </h3>
                    <p style={{ color: '#9ca3af', fontSize: '0.84rem' }}>{srv.desc}</p>
                  </div>
                  <div className="ritual-footer">
                    <span style={{ fontSize: '0.85rem', color: '#d1d5db' }}>
                      <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                      {srv.duracion} min · <strong style={{ color: '#eab32e' }}>${srv.precio.toLocaleString('es-CL')} CLP</strong>
                    </span>
                    <button
                      className="btn-gold"
                      style={{ padding: '0.45rem 0.9rem', fontSize: '0.74rem' }}
                      onClick={() => irAReservar({ servicioNombre: srv.nombre })}
                    >
                      AGENDAR →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Red de Ateliers en Santiago */}
          <section id="sedes-sec">
            <div className="section-head">
              <div>
                <div style={{ fontSize: '0.7rem', color: '#eab32e', letterSpacing: '1.5px', fontWeight: 700 }}>
                  RED DE ATELIERS · SANTIAGO DE CHILE
                </div>
                <h2>En el Epicentro de la Exclusividad</h2>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '0.84rem', maxWidth: '380px' }}>
                Seleccione su atelier de preferencia. Cuatro enclaves estratégicos en Santiago
                diseñados bajo rigor y confort.
              </p>
            </div>

            <div className="filter-row" style={{ marginBottom: '1rem' }}>
              {SEDES_INFO.map((s, idx) => (
                <button
                  key={s.comuna}
                  className={`filter-btn ${sedeInicioIdx === idx ? 'active' : ''}`}
                  onClick={() => setSedeInicioIdx(idx)}
                >
                  <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  {s.comuna.toUpperCase()} — {s.nombre.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="sedes-split">
              <div className="sede-detail-card">
                <span className="badge-pill">{sedeActual.tag} · HORARIO CONTINUADO</span>
                <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  BarberClub {sedeActual.nombre} — {sedeActual.comuna}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '0.86rem', marginBottom: '1.25rem' }}>
                  {sedeActual.desc}
                </p>
                <div style={{ fontSize: '0.84rem', display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div><MapPin size={15} color="#eab32e" style={{ display: 'inline', marginRight: '6px' }} /> <strong>Dirección:</strong> {sedeActual.direccion}</div>
                  <div><Clock size={15} color="#eab32e" style={{ display: 'inline', marginRight: '6px' }} /> <strong>Horarios:</strong> {sedeActual.horario}</div>
                  <div><Phone size={15} color="#eab32e" style={{ display: 'inline', marginRight: '6px' }} /> <strong>Concierge:</strong> {sedeActual.telefono}</div>
                  <div><Car size={15} color="#eab32e" style={{ display: 'inline', marginRight: '6px' }} /> <strong>Valet Parking:</strong> Plazas de estacionamiento internas custodiadas.</div>
                </div>
                <button className="btn-gold" onClick={() => irAReservar({ comuna: sedeActual.comuna })}>
                  <Calendar size={14} /> RESERVAR EN ESTE ATELIER
                </button>
              </div>

              <div className="sede-map-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(145deg, #161b24, #0f1218)' }}>
                <div>
                  <span className="badge-pill">UBICACIÓN SECTOR ORIENTE</span>
                  <h4 className="font-serif" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    {sedeActual.comuna} · Santiago Metropolitana
                  </h4>
                  <p style={{ color: '#9ca3af', fontSize: '0.84rem' }}>
                    Conexión directa entre sedes vecinas ({sedeActual.comuna === 'Las Condes' || sedeActual.comuna === 'Lo Barnechea' ? 'Corredor Las Condes ↔ Lo Barnechea' : 'Corredor Providencia ↔ Vitacura'}) con disponibilidad sincronizada en tiempo real.
                  </p>
                  <iframe
                    title={`Mapa de BarberClub ${sedeActual.nombre}`}
                    src={sedeActual.mapa}
                    width="100%"
                    height="220"
                    style={{ border: 0, borderRadius: '12px', marginTop: '1rem' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a
                    className="btn-gold"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${sedeActual.direccion}, ${sedeActual.comuna}, Chile`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginTop: '0.75rem', textDecoration: 'none' }}
                  >
                    Abrir indicaciones en Google Maps
                  </a>
                </div>
                <div style={{ background: '#13151a', border: '1px solid #282c37', borderRadius: '12px', padding: '1rem', marginTop: '1.5rem' }}>
                  <strong style={{ color: '#eab32e', fontSize: '0.85rem' }}>Valet Parking {sedeActual.nombre}</strong>
                  <div style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Entrada vehicular privada · Sin costo para clientes con reserva.</div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =========================================================
          VISTA 2: SERVICIOS (image_6a4847.jpg)
         ========================================================= */}
      {pagina === 'SERVICIOS' && (
        <main className="page-wrap">
          <section className="center-hero">
            <div className="badge-pill">✦ ARTE DE BARBERÍA &amp; ALTA PELUQUERÍA</div>
            <h1>Catálogo de Servicios &amp; Estilos</h1>
            <p>
              Maestría artesanal sin distinción de género. Fusionamos el rigor clásico de las
              antiguas barberías europeas con la sofisticación contemporánea de la alta peluquería
              unisex en Santiago de Chile.
            </p>
          </section>

          <div className="filter-panel">
            <div className="filter-row" style={{ justifyContent: 'space-between' }}>
              <div className="filter-row">
                {[
                  { id: 'TODAS', label: 'Todos los Servicios' },
                  { id: 'MASCULINO', label: 'Estilos Masculinos & Barbería' },
                  { id: 'FEMENINO', label: 'Estilos Femeninos & Color' },
                  { id: 'TRATAMIENTO', label: 'Tratamientos & Cuidado' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    className={`filter-btn ${filtroCatServicio === cat.id ? 'active' : ''}`}
                    onClick={() => setFiltroCatServicio(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: '0.76rem', color: '#9ca3af' }}>
                ● Garantía de Satisfacción 100% · Todas las Sedes
              </span>
            </div>
          </div>

          <section className="cards-3">
            {CATALOGO_SERVICIOS.filter((s) => filtroCatServicio === 'TODAS' || s.categoria === filtroCatServicio).map((srv) => (
              <article key={srv.nombre} className="item-card">
                <div className="item-img-box">
                  <img src={srv.foto} alt={srv.nombre} />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#eab32e', color: '#0b0c0e', fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                    {srv.badge}
                  </span>
                  <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(11,12,14,0.85)', color: '#fff', fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                    {srv.duracion} min
                  </span>
                </div>
                <div className="item-body">
                  <div>
                    <h3 className="font-serif" style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>
                      {srv.nombre}
                    </h3>
                    <p style={{ color: '#9ca3af', fontSize: '0.83rem', marginBottom: '1.2rem' }}>{srv.desc}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #222630', paddingTop: '0.9rem' }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>INVERSIÓN</div>
                      <strong style={{ color: '#eab32e', fontSize: '1.1rem' }}>${srv.precio.toLocaleString('es-CL')} CLP</strong>
                    </div>
                    <button
                      className="btn-gold"
                      style={{ borderRadius: '8px', padding: '0.55rem 0.95rem' }}
                      onClick={() => irAReservar({ servicioNombre: srv.nombre })}
                    >
                      RESERVAR CITA
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </main>
      )}

      {/* =========================================================
          VISTA 3: MAESTROS (image_6a4887.jpg)
         ========================================================= */}
      {pagina === 'MAESTROS' && (
        <main className="page-wrap">
          <section className="center-hero">
            <div className="badge-pill">✦ ARTESANOS DEL ESTILO &amp; VISAGISMO</div>
            <h1>Maestros Barberos &amp; Diseñadores Capilares</h1>
            <p>
              Un colectivo de talentos con trayectoria internacional, expertos en visagismo
              fisonómico, técnicas de tijera clásicas, barbería tradicional y alta colorimetría
              unisex distribuidos en nuestros 4 ateliers en Santiago.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.8rem', color: '#d1d5db', marginTop: '1.2rem' }}>
              <span><Award size={14} color="#eab32e" style={{ display: 'inline' }} /> Certificación Internacional</span>
              <span><UserCheck size={14} color="#eab32e" style={{ display: 'inline' }} /> Consultoría de Rostro 100% Personalizada</span>
              <span><Coffee size={14} color="#eab32e" style={{ display: 'inline' }} /> Cortesía de Café &amp; Single Malt</span>
            </div>
          </section>

          <div className="filter-panel">
            <div style={{ fontSize: '0.68rem', color: '#6b7280', fontWeight: 700, letterSpacing: '1.4px', marginBottom: '0.6rem' }}>
              FILTRAR POR ATELIER EN SANTIAGO:
            </div>
            <div className="filter-row" style={{ marginBottom: '0.9rem' }}>
              <button className={`filter-btn ${filtroComuna === 'TODAS' ? 'active' : ''}`} onClick={() => setFiltroComuna('TODAS')}>
                Todos los Ateliers (8)
              </button>
              {SEDES_INFO.map((s) => (
                <button
                  key={s.comuna}
                  className={`filter-btn ${filtroComuna === s.comuna ? 'active' : ''}`}
                  onClick={() => setFiltroComuna(s.comuna)}
                >
                  {s.comuna} — {s.nombre} (2)
                </button>
              ))}
            </div>
            <div className="filter-row" style={{ justifyContent: 'space-between' }}>
              <div className="filter-row">
                <button className={`filter-btn ${filtroDisc === 'TODAS' ? 'disc-active' : ''}`} onClick={() => setFiltroDisc('TODAS')}>
                  TODAS LAS DISCIPLINAS
                </button>
                <button className={`filter-btn ${filtroDisc === 'BARBERIA' ? 'disc-active' : ''}`} onClick={() => setFiltroDisc('BARBERIA')}>
                  MAESTROS BARBEROS &amp; AFEITADO
                </button>
                <button className={`filter-btn ${filtroDisc === 'UNISEX' ? 'disc-active' : ''}`} onClick={() => setFiltroDisc('UNISEX')}>
                  ESTILISTAS UNISEX &amp; COLORIMETRÍA
                </button>
              </div>
              <span style={{ fontSize: '0.76rem', color: '#4ade80' }}>
                ● Mostrando {MAESTROS_LISTA.filter((m) => (filtroComuna === 'TODAS' || m.comuna === filtroComuna) && (filtroDisc === 'TODAS' || m.disciplina === filtroDisc)).length} artistas disponibles
              </span>
            </div>
          </div>

          <section className="cards-4">
            {MAESTROS_LISTA.filter((m) => (filtroComuna === 'TODAS' || m.comuna === filtroComuna) && (filtroDisc === 'TODAS' || m.disciplina === filtroDisc)).map((m) => (
              <article key={m.nombre} className="item-card">
                <div className="item-img-box">
                  <img src={m.foto} alt={m.nombre} />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(11,12,14,0.85)', fontSize: '0.7rem', padding: '0.25rem 0.55rem', borderRadius: '6px' }}>
                    <MapPin size={11} color="#eab32e" style={{ display: 'inline' }} /> {m.comuna} — {m.local}
                  </span>
                  <span style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(28,24,14,0.92)', border: '1px solid rgba(234,179,46,0.4)', color: '#eab32e', fontSize: '0.7rem', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                    {m.exp}
                  </span>
                </div>
                <div className="item-body">
                  <div>
                    <h3 className="font-serif" style={{ fontSize: '1.3rem' }}>{m.nombre}</h3>
                    <div style={{ color: '#eab32e', fontSize: '0.76rem', fontWeight: 600 }}>{m.cargo}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.72rem', marginBottom: '0.65rem' }}>{m.academia}</div>
                    <p style={{ color: '#9ca3af', fontSize: '0.8rem' }}>{m.bio}</p>
                    <div className="skill-tags">
                      {m.tags.map((t) => <span key={t} className="skill-pill">{t}</span>)}
                    </div>
                  </div>
                  <button
                    className="btn-gold"
                    style={{ width: '100%', justifyContent: 'center', borderRadius: '10px', padding: '0.75rem' }}
                    onClick={() => irAReservar({ comuna: m.comuna, maestro: m.nombre })}
                  >
                    RESERVAR CON {m.nombre.replace('Don ', '').split(' ')[0].toUpperCase()}
                  </button>
                </div>
              </article>
            ))}
          </section>
        </main>
      )}

      {/* =========================================================
          VISTA 4: RESERVE SU CITA PRIVADA (image_6a47e5.jpg)
         ========================================================= */}
      {pagina === 'RESERVAR' && (
        <main className="page-wrap">
          <div style={{ marginBottom: '2rem' }}>
            <div className="badge-pill">BARBERCLUB ATELIER · DISPONIBILIDAD EN TIEMPO REAL</div>
            <h1 className="font-serif" style={{ fontSize: '2.7rem', marginBottom: '0.5rem' }}>
              Reserve su Cita Privada
            </h1>
            <p style={{ color: '#9ca3af', maxWidth: '680px', fontSize: '0.94rem' }}>
              Atelier Unisex de Alta Peluquería y Barbería. Seleccione su ritual de estilismo,
              corte, color o cuidado personal, estilista de confianza y horario exclusivo.
            </p>
          </div>

          <form onSubmit={handleConfirmarReserva} className="booking-layout">
            {/* COLUMNA IZQUIERDA: 6 PASOS NUMERADOS */}
            <div>
              {/* 01 Selección de Sede */}
              <div className="step-block">
                <div className="step-header">
                  <div className="step-title"><span className="step-num">01</span> Selección de Sede (Santiago)</div>
                  <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>4 LOCALES EXCLUSIVOS</span>
                </div>
                <div className="select-grid-4">
                  {SEDES_INFO.map((s) => (
                    <div
                      key={s.comuna}
                      className={`selectable-card ${comunaReserva === s.comuna ? 'selected' : ''}`}
                      onClick={() => {
                        setComunaReserva(s.comuna);
                        const primerMaestro = MAESTROS_LISTA.find((m) => m.comuna === s.comuna);
                        if (primerMaestro) setMaestroNombre(primerMaestro.nombre);
                      }}
                    >
                      <span style={{ fontSize: '0.62rem', background: '#eab32e', color: '#0b0c0e', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                        {s.tag}
                      </span>
                      <div style={{ fontWeight: 700, marginTop: '0.45rem' }}>{s.comuna}</div>
                      <div style={{ fontSize: '0.78rem', color: '#eab32e' }}>{s.nombre}</div>
                      <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.35rem' }}>● Valet Parking Activo</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 02 Selección de Ritual */}
              <div className="step-block">
                <div className="step-header">
                  <div className="step-title"><span className="step-num">02</span> Selección de Ritual</div>
                  <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>PAGO EN SALÓN</span>
                </div>
                <div className="select-grid-2">
                  {CATALOGO_SERVICIOS.slice(0, 4).map((srv, idx) => (
                    <div
                      key={srv.nombre}
                      className={`selectable-card ${servicioIdx === idx ? 'selected' : ''}`}
                      onClick={() => setServicioIdx(idx)}
                    >
                      <div style={{ fontSize: '0.65rem', color: '#eab32e', fontWeight: 700 }}>{srv.badge}</div>
                      <div className="font-serif" style={{ fontSize: '1.1rem', margin: '0.25rem 0' }}>{srv.nombre}</div>
                      <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                        <Clock size={12} style={{ display: 'inline' }} /> {srv.duracion} minutos ·{' '}
                        <strong style={{ color: '#eab32e' }}>${srv.precio.toLocaleString('es-CL')} CLP</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 03 Selección de Fecha */}
              <div className="step-block">
                <div className="step-header">
                  <div className="step-title"><span className="step-num">03</span> Selección de Fecha</div>
                  <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
                    {new Intl.DateTimeFormat('es-CL', { month: 'long', year: 'numeric' }).format(new Date())}
                  </span>
                </div>
                <div className="date-strip">
                  {DIAS_SEMANA.map((d) => (
                    <div
                      key={d.fechaISO}
                      className={`date-pill ${diaSel.fechaISO === d.fechaISO ? 'selected' : ''}`}
                      onClick={() => setDiaSel(d)}
                    >
                      <div style={{ fontSize: '0.68rem' }}>{d.dia}</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{d.num}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 04 Maestro Barbero & Estilista */}
              <div className="step-block">
                <div className="step-header">
                  <div className="step-title"><span className="step-num">04</span> Maestro Barbero &amp; Estilista</div>
                  <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>SELECCIÓN DE ARTISTA</span>
                </div>
                <div className="select-grid-3">
                  {MAESTROS_LISTA.filter((m) => m.comuna === comunaReserva).map((m) => (
                    <div
                      key={m.nombre}
                      className={`selectable-card ${maestroNombre === m.nombre ? 'selected' : ''}`}
                      style={{ textAlign: 'center' }}
                      onClick={() => setMaestroNombre(m.nombre)}
                    >
                      <img
                        src={m.foto}
                        alt={m.nombre}
                        style={{ width: '58px', height: '58px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 0.5rem', border: '2px solid #eab32e' }}
                      />
                      <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{m.nombre}</div>
                      <div style={{ fontSize: '0.7rem', color: '#eab32e', marginBottom: '0.35rem' }}>{m.cargo}</div>
                      <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{m.exp}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 05 Horarios Disponibles */}
              <div className="step-block">
                <div className="step-header">
                  <div className="step-title"><span className="step-num">05</span> Horarios Disponibles</div>
                  <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>FRANJAS DE {servicioActual.duracion} MINUTOS</span>
                </div>
                <div className="time-grid">
                  {BLOQUES_HORA.map((h) => (
                    <button
                      type="button"
                      key={h}
                      className={`time-pill ${horaSel === h ? 'selected' : ''}`}
                      disabled={bloquesOcupados.includes(h)}
                      onClick={() => setHoraSel(h)}
                    >
                      {h} HRS {bloquesOcupados.includes(h) ? '— OCUPADO' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* 06 Datos de Contacto del Huésped */}
              <div className="step-block">
                <div className="step-header">
                  <div className="step-title"><span className="step-num">06</span> Datos de Contacto del Huésped</div>
                </div>
                <div className="guest-box">
                  <div className="guest-row">
                    <div>
                      <label style={{ fontSize: '0.72rem', color: '#9ca3af' }}>NOMBRE COMPLETO *</label>
                      <input
                        type="text"
                        placeholder="Ej: Freddy Carrasco"
                        value={clienteNombre}
                        pattern="[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{3,120}"
                        title="Ingrese solo letras"
                        onChange={(e) => setClienteNombre(
                          e.target.value.replace(/[0-9]/g, '').slice(0, 120)
                        )}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: '#9ca3af' }}>TELÉFONO CONCIERGE / WHATSAPP *</label>
                      <input
                        type="tel"
                        inputMode="tel"
                        pattern="\+569[0-9]{8}"
                        maxLength={12}
                        placeholder="+56954234739"
                        value={clienteTel}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
                          setClienteTel(digits ? `+${digits}` : '');
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#9ca3af' }}>CORREO ELECTRÓNICO (CONFIRMACIÓN) *</label>
                    <input
                      type="email"
                      placeholder="cliente@correo.cl"
                      value={clienteCorreo}
                      onChange={(e) => setClienteCorreo(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: HOJA DE ENCARGO / RESUMEN DE CITA */}
            <aside className="summary-sticky">
              <div style={{ fontSize: '0.68rem', color: '#eab32e', letterSpacing: '1.4px', fontWeight: 700 }}>
                HOJA DE ENCARGO
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>
                Resumen de Cita
              </h3>

              <div className="summary-row">
                <div style={{ fontSize: '0.66rem', color: '#9ca3af' }}>SEDE ATELIER</div>
                <strong>{comunaReserva} — {SEDES_INFO.find((s) => s.comuna === comunaReserva)?.nombre}</strong>
              </div>

              <div className="summary-row">
                <div style={{ fontSize: '0.66rem', color: '#9ca3af' }}>RITUAL ESCOGIDO</div>
                <strong>{servicioActual.nombre}</strong>
                <div style={{ fontSize: '0.74rem', color: '#9ca3af' }}>{servicioActual.duracion} minutos</div>
              </div>

              <div className="summary-row">
                <div style={{ fontSize: '0.66rem', color: '#9ca3af' }}>ARTISTA ASIGNADO</div>
                <strong>{maestroNombre}</strong>
              </div>

              <div className="summary-row">
                <div style={{ fontSize: '0.66rem', color: '#9ca3af' }}>FECHA &amp; TURNO</div>
                <strong>{diaSel.dia} {diaSel.num} · {horaSel} hrs</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1.1rem 0 0.5rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>VALOR REFERENCIAL</span>
                <strong style={{ fontSize: '1.35rem', color: '#eab32e' }}>
                  ${servicioActual.precio.toLocaleString('es-CL')} CLP
                </strong>
              </div>

              {/* Consentimiento expreso NO premarcado (Ley N.° 21.719 / HU-09) */}
              <div className="consent-box">
                <input
                  type="checkbox"
                  id="consent-ley-21719"
                  checked={consentimiento}
                  onChange={(e) => setConsentimiento(e.target.checked)}
                  style={{ marginTop: '3px', width: '16px', height: '16px' }}
                />
                <label htmlFor="consent-ley-21719" style={{ cursor: 'pointer' }}>
                  Acepto expresamente el uso de mis datos personales para gestionar esta reserva y
                  recibir recordatorios conforme a la <strong>Ley N.° 21.719</strong> (Política v1.0-2026).
                </label>
              </div>

              <button
                type="submit"
                className="btn-gold"
                disabled={enviando}
                style={{ width: '100%', justifyContent: 'center', borderRadius: '10px', padding: '0.9rem' }}
              >
                {enviando ? 'PROCESANDO EN SERVIDOR...' : 'CONFIRMAR RESERVA INMEDIATA →'}
              </button>

              {errorReserva && (
                <div style={{ marginTop: '0.85rem', padding: '0.75rem', borderRadius: '8px', background: 'rgba(217,119,6,0.2)', border: '1px solid #d97706', color: '#fde68a', fontSize: '0.8rem' }}>
                  {errorReserva}
                </div>
              )}

              {reservaOk && (
                <div style={{ marginTop: '0.85rem', padding: '0.75rem', borderRadius: '8px', background: 'rgba(22,163,74,0.2)', border: '1px solid #16a34a', color: '#86efac', fontSize: '0.8rem' }}>
                  <CheckCircle2 size={15} style={{ display: 'inline', marginRight: '5px' }} />
                  {reservaOk}
                </div>
              )}

              {sugerenciasVecinas !== null && (
                <div style={{ marginTop: '0.85rem', padding: '0.75rem', borderRadius: '8px', background: 'rgba(217,119,6,0.2)', border: '1px solid #d97706', color: '#fde68a', fontSize: '0.8rem' }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.35rem' }}>
                    <AlertTriangle size={14} style={{ display: 'inline' }} /> Bloque ocupado en {comunaReserva}.
                  </div>
                  {sugerenciasVecinas.length > 0 ? (
                    sugerenciasVecinas.map((alt) => (
                      <button
                        key={alt.especialista_id}
                        type="button"
                        className="btn-gold"
                        style={{ fontSize: '0.72rem', padding: '0.35rem 0.7rem', marginTop: '0.3rem' }}
                        onClick={() => {
                          setComunaReserva(alt.sucursal);
                          setMaestroNombre(alt.especialista);
                          setSugerenciasVecinas(null);
                        }}
                      >
                        Cambiar a {alt.sucursal} con {alt.especialista}
                      </button>
                    ))
                  ) : (
                    <span>Selecciona otro horario disponible en el paso 05.</span>
                  )}
                </div>
              )}
            </aside>
          </form>
        </main>
      )}

      {authModal && (
        <div className="auth-overlay" role="dialog" aria-modal="true" aria-label="Acceso a BarberClub">
          <div className="auth-modal">
            <button
              type="button"
              className="auth-close"
              onClick={() => { setAuthModal(false); setAuthError(''); }}
              aria-label="Cerrar"
            >
              ×
            </button>

            {authModo === 'CERRAR' ? (
              <>
                <span className="badge-pill">CUENTA SEGURA</span>
                <h2>¿Cerrar sesión?</h2>
                <p>Tu cuenta permanecerá registrada en este dispositivo.</p>
                {authError && <div className="auth-error">{authError}</div>}
                <div className="auth-actions">
                  <button type="button" className="btn-dark" onClick={() => setAuthModal(false)}>
                    Cancelar
                  </button>
                  <button type="button" className="btn-gold" onClick={cerrarSesion}>
                    Cerrar sesión
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="badge-pill">CUENTA BARBERCLUB</span>
                <h2>
                  {authModo === 'REGISTRARSE'
                    ? 'Crear cuenta nueva'
                    : authModo === 'RECUPERAR'
                      ? 'Recuperar contraseña'
                      : authModo === 'RESTABLECER'
                        ? 'Crear nueva contraseña'
                        : 'Iniciar sesión'}
                </h2>
                {authModo !== 'RECUPERAR' && authModo !== 'RESTABLECER' && (
                  <div className="auth-tabs">
                  <button
                    type="button"
                    className={authModo === 'INICIAR' ? 'active' : ''}
                    onClick={() => { setAuthModo('INICIAR'); setAuthError(''); }}
                  >
                    Iniciar sesión
                  </button>
                  <button
                    type="button"
                    className={authModo === 'REGISTRARSE' ? 'active' : ''}
                    onClick={() => { setAuthModo('REGISTRARSE'); setAuthError(''); }}
                  >
                    Crear cuenta
                  </button>
                  </div>
                )}

                <form className="auth-form" onSubmit={enviarAuth}>
                  {(authModo === 'REGISTRARSE' || authModo === 'RECUPERAR') && (
                    <label>
                      Correo electrónico
                      <input
                        type="email"
                        value={authForm.email}
                        onChange={(event) => cambiarAuthForm('email', event.target.value)}
                        required
                      />
                    </label>
                  )}
                  {authModo === 'REGISTRARSE' && (
                    <>
                      <label>
                        Nombre completo
                        <input
                          type="text"
                          value={authForm.firstName}
                          pattern="[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{3,120}"
                          title="Ingrese solo letras"
                          onChange={(event) => cambiarAuthForm(
                            'firstName',
                            event.target.value.replace(/[0-9]/g, '').slice(0, 120)
                          )}
                          required
                        />
                      </label>
                      <label>
                        Teléfono
                        <input
                          type="tel"
                          inputMode="tel"
                          pattern="\+569[0-9]{8}"
                          maxLength={12}
                          placeholder="+56954234739"
                          value={authForm.telefono}
                          onChange={(event) => {
                            const digits = event.target.value.replace(/\D/g, '').slice(0, 11);
                            cambiarAuthForm('telefono', digits ? `+${digits}` : '');
                          }}
                        />
                      </label>
                    </>
                  )}
                  {(authModo === 'INICIAR' || authModo === 'REGISTRARSE') && (
                    <label>
                      Usuario
                      <input
                        type="text"
                        value={authForm.username}
                        onChange={(event) => cambiarAuthForm('username', event.target.value)}
                        required
                        autoComplete="username"
                      />
                    </label>
                  )}
                  {(authModo === 'INICIAR' || authModo === 'REGISTRARSE' || authModo === 'RESTABLECER') && (
                    <label>
                      {authModo === 'RESTABLECER' ? 'Nueva contraseña' : 'Contraseña'}
                      <input
                        type="password"
                        value={authForm.password}
                        onChange={(event) => cambiarAuthForm('password', event.target.value)}
                        required
                        autoComplete={authModo === 'INICIAR' ? 'current-password' : 'new-password'}
                      />
                    </label>
                  )}
                  {authModo === 'INICIAR' && (
                    <button
                      type="button"
                      className="auth-link"
                      onClick={() => { setAuthModo('RECUPERAR'); setAuthError(''); }}
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  )}
                  {authModo === 'RECUPERAR' && (
                    <button
                      type="button"
                      className="auth-link"
                      onClick={() => setAuthModo('INICIAR')}
                    >
                      Volver a iniciar sesión
                    </button>
                  )}
                  {authError && <div className="auth-error">{authError}</div>}
                  <button type="submit" className="btn-gold auth-submit" disabled={authEnviando}>
                    {authEnviando
                      ? 'PROCESANDO...'
                      : authModo === 'REGISTRARSE'
                        ? 'CREAR CUENTA'
                        : authModo === 'RECUPERAR'
                          ? 'ENVIAR ENLACE'
                          : authModo === 'RESTABLECER'
                            ? 'RESTABLECER CONTRASEÑA'
                            : 'INICIAR SESIÓN'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* FOOTER INSTITUCIONAL COMPARTIDO */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="brand-title" style={{ marginBottom: '0.6rem' }}>Barber Club &amp; Beauty</div>
            <p>
              El santuario de la distinción y cuidado capilar sin género. Barbería clásica, alta
              peluquería unisex y bienestar en un entorno exclusivo.
            </p>
          </div>
          <div>
            <h4>Horarios de Atención</h4>
            <p>Lunes — Viernes: 09:00 — 21:00</p>
            <p>Sábados de Ritual: 09:30 — 20:30</p>
            <p>Domingos Club VIP: Cerrado</p>
          </div>
          <div>
            <h4>Ateliers en Santiago</h4>
            <p><strong>Las Condes — El Golf:</strong> Av. Isidora Goyenechea 3120</p>
            <p><strong>Vitacura — Alonso de Córdova:</strong> Av. Alonso de Córdova 3890</p>
            <p><strong>Providencia — Pedro de Valdivia:</strong> Av. Pedro de Valdivia 1450</p>
            <p><strong>Lo Barnechea — La Dehesa:</strong> Av. La Dehesa 1844</p>
          </div>
          <div>
            <h4>Contacto Directo</h4>
            <p>+56 2 2480 9100 (Central)</p>
            <p>WhatsApp Concierge 24/7: +56 9 8800 0000</p>
            <p>concierge@barberclub.cl</p>
            <p>Santiago de Chile</p>
          </div>
        </div>
        <div style={{ maxWidth: '1180px', margin: '0 auto', borderTop: '1px solid #1a1d24', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <span>© 2026 Barber Club &amp; Beauty — Barbería &amp; Peluquería Unisex. Todos los derechos reservados.</span>
          <span>Privacidad (Ley N.° 21.719) · Términos del Club · Garantía de Excelencia</span>
        </div>
      </footer>
    </div>
  );
}