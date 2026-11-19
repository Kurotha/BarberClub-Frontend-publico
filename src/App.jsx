import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Award, Calendar, CheckCircle2, Coffee, MapPin,
  ShieldCheck, Sparkles, UserCheck, X, AlertTriangle
} from 'lucide-react';

const API_URL = 'http://127.0.0.1:8000/api';

// Catálogo visual alineado con el prototipo aprobado (Figuras 1, 2 y 3)
const PERFILES_PROTOTIPO = [
  {
    nombre: 'Sebastián Krause',
    comuna: 'Las Condes',
    local: 'El Golf',
    disciplina: 'BARBERIA',
    cargo: 'Maestro Barbero & Visagismo Facial',
    academia: 'Formado en Buenos Aires',
    exp: '12 años de experiencia',
    bio: 'Dominio de cortes crop texturizados, perfilado de patillas y barba con toalla caliente infusionada en cedro y styling.',
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
    bio: 'Maestría en ritual de afeitado con espuma tibia de brocha tejón y navaja Solingen, complementado con masaje craneal.',
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
    bio: 'Especialista en afeitado imperial a navaja barbera clásica, degradados artesanales a peine y tijera, y esculpido de barba.',
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
    bio: 'Pionera en técnicas de babylights a mano alzada, corrección de color compleja y diseño de cortes en capas de alto movimiento.',
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
    bio: 'Experto en texturizado contemporáneo, low y mid fades con máquina cóncava, diseños geométricos limpios y rituales de vapor.',
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
    bio: 'Referente en corte editorial en seco y húmedo, brushing de fijación prolongada y tratamientos de botánica regenerativa.',
    tags: ['Corte Editorial', 'Brushing Glam', 'Nutrición Botánica'],
    foto: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80',
  },
];

export default function App() {
  const [sucursalesApi, setSucursalesApi] = useState([]);
  const [especialistasApi, setEspecialistasApi] = useState([]);
  const [serviciosApi, setServiciosApi] = useState([]);

  const [filtroComuna, setFiltroComuna] = useState('TODAS');
  const [filtroDisciplina, setFiltroDisciplina] = useState('TODAS');

  // Estado Modal Reserva (HU-01 + HU-05 + HU-09)
  const [modalAbierto, setModalAbierto] = useState(false);
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
  const [alternativasVecinas, setAlternativasVecinas] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    cargarApi();
  }, []);

  const cargarApi = async () => {
    try {
      const [rSuc, rEsp, rSer] = await Promise.all([
        axios.get(`${API_URL}/sucursales/`),
        axios.get(`${API_URL}/especialistas/`),
        axios.get(`${API_URL}/servicios/`),
      ]);
      setSucursalesApi(rSuc.data);
      setEspecialistasApi(rEsp.data);
      setServiciosApi(rSer.data);
      if (rSer.data.length > 0) setServicioSel(rSer.data[0].id);
    } catch (e) {
      console.error('Error conectando con Django API:', e);
    }
  };

  const abrirModalReserva = (perfil) => {
    const sucMatch = sucursalesApi.find((s) => s.comuna === perfil?.comuna) || sucursalesApi[0];
    const espMatch =
      especialistasApi.find((e) => e.nombre_completo === perfil?.nombre) ||
      especialistasApi.find((e) => e.sucursal === sucMatch?.id) ||
      especialistasApi[0];

    setSucursalSel(sucMatch?.id || '');
    setEspecialistaSel(espMatch?.id || '');
    setMensajeOk(null);
    setAlternativasVecinas(null);
    setErrorMsg('');
    setConsentimiento(false);
    setModalAbierto(true);
  };

  const handleConfirmarCita = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setMensajeOk(null);
    setAlternativasVecinas(null);

    if (!consentimiento) {
      setErrorMsg('Debes aceptar el consentimiento expreso (Ley N.° 21.719) para agendar.');
      return;
    }

    setEnviando(true);
    try {
      const payload = {
        cliente_nombre: nombre,
        cliente_telefono: telefono,
        cliente_correo: correo,
        especialista: Number(especialistaSel),
        sucursal: Number(sucursalSel),
        servicio: Number(servicioSel),
        fecha_hora: new Date(fechaHora).toISOString(),
        consentimiento_aceptado: consentimiento,
        version_politica: 'v1.0-2026',
      };
      const res = await axios.post(`${API_URL}/citas/`, payload);
      setMensajeOk(
        `¡Cita #${res.data.id} agendada con ${res.data.especialista_nombre} en ${res.data.sucursal_nombre}!`
      );
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setAlternativasVecinas(err.response.data.sugerencia_sucursal_cercana || []);
      } else {
        setErrorMsg('No se pudo registrar la reserva. Verifica los campos o la conexión al Backend.');
      }
    } finally {
      setEnviando(false);
    }
  };

  const perfilesFiltrados = PERFILES_PROTOTIPO.filter((p) => {
    const okComuna = filtroComuna === 'TODAS' || p.comuna === filtroComuna;
    const okDisc = filtroDisciplina === 'TODAS' || p.disciplina === filtroDisciplina;
    return okComuna && okDisc;
  });

  return (
    <div id="inicio">
      {/* Navbar superior idéntica a Figura 1 */}
      <header className="navbar">
        <div className="brand-wrap">
          <div className="brand-icon">BC</div>
          <div>
            <div className="brand-title">BARBER CLUB & BEAUTY</div>
            <div className="brand-sub">BARBERÍA & PELUQUERÍA UNISEX</div>
          </div>
        </div>

        <ul className="nav-links">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#locales">Servicios</a></li>
          <li><a href="#maestros">Maestros</a></li>
          <li><a href="#locales">Locales</a></li>
        </ul>

        <button className="btn-gold" onClick={() => abrirModalReserva(null)}>
          <Calendar size={15} /> RESERVAR CITA
        </button>
      </header>

      {/* Hero Section idéntico a Figura 1 */}
      <section className="hero">
        <div className="badge-pill">
          <Sparkles size={13} /> ARTESANOS DEL ESTILO & VISAGISMO
        </div>
        <h1>Maestros Barberos &amp; Diseñadores Capilares</h1>
        <p>
          Un colectivo de talentos con trayectoria internacional, expertos en visagismo fisonómico,
          técnicas de tijera clásicas, barbería tradicional y alta colorimetría unisex distribuidos
          en nuestros 4 ateliers en Santiago.
        </p>
        <div className="hero-perks">
          <span><Award size={15} color="#eab32e" /> Certificación Internacional</span>
          <span><UserCheck size={15} color="#eab32e" /> Consultoría de Rostro 100% Personalizada</span>
          <span><Coffee size={15} color="#eab32e" /> Cortesía de Café &amp; Single Malt</span>
        </div>
      </section>

      {/* Panel de Filtros por Atelier y Disciplina */}
      <section id="locales" className="filter-panel">
        <span className="filter-label">FILTRAR POR ATELIER EN SANTIAGO:</span>
        <div className="filter-row" style={{ marginBottom: '1rem' }}>
          <button
            className={`filter-btn ${filtroComuna === 'TODAS' ? 'active' : ''}`}
            onClick={() => setFiltroComuna('TODAS')}
          >
            Todos los Ateliers (8)
          </button>
          {['Las Condes', 'Vitacura', 'Providencia', 'Lo Barnechea'].map((com) => {
            const sub = com === 'Las Condes' ? 'El Golf' : com === 'Vitacura' ? 'Alonso de Córdova' : com === 'Providencia' ? 'P. de Valdivia' : 'La Dehesa';
            return (
              <button
                key={com}
                className={`filter-btn ${filtroComuna === com ? 'active' : ''}`}
                onClick={() => setFiltroComuna(com)}
              >
                {com} — {sub} (2)
              </button>
            );
          })}
        </div>

        <div className="filter-row" style={{ justifyContent: 'space-between' }}>
          <div className="filter-row">
            <button
              className={`filter-btn ${filtroDisciplina === 'TODAS' ? 'disc-active' : ''}`}
              onClick={() => setFiltroDisciplina('TODAS')}
            >
              TODAS LAS DISCIPLINAS
            </button>
            <button
              className={`filter-btn ${filtroDisciplina === 'BARBERIA' ? 'disc-active' : ''}`}
              onClick={() => setFiltroDisciplina('BARBERIA')}
            >
              MAESTROS BARBEROS &amp; AFEITADO
            </button>
            <button
              className={`filter-btn ${filtroDisciplina === 'UNISEX' ? 'disc-active' : ''}`}
              onClick={() => setFiltroDisciplina('UNISEX')}
            >
              ESTILISTAS UNISEX &amp; COLORIMETRÍA
            </button>
          </div>
          <span style={{ fontSize: '0.78rem', color: '#4ade80' }}>
            ● Mostrando {perfilesFiltrados.length} artistas disponibles
          </span>
        </div>
      </section>

      {/* Grilla de Tarjetas (Figuras 2 y 3) */}
      <main id="maestros" className="grid-cards">
        {perfilesFiltrados.map((p) => (
          <article key={p.nombre} className="card">
            <div className="card-img-wrap">
              <img src={p.foto} alt={p.nombre} />
              <div className="card-loc-badge">
                <MapPin size={12} color="#eab32e" /> {p.comuna} — {p.local}
              </div>
              <div className="card-exp-badge">{p.exp}</div>
            </div>

            <div className="card-body">
              <div>
                <h3>{p.nombre}</h3>
                <div className="card-spec">{p.cargo}</div>
                <div className="card-academy">{p.academia}</div>
                <p className="card-bio">{p.bio}</p>
                <div className="skill-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="skill-pill">{t}</span>
                  ))}
                </div>
              </div>

              <button
                className="btn-gold"
                style={{ width: '100%', justifyContent: 'center', borderRadius: '10px', padding: '0.8rem' }}
                onClick={() => abrirModalReserva(p)}
              >
                RESERVAR CON {p.nombre.replace('Don ', '').split(' ')[0].toUpperCase()} <Calendar size={14} />
              </button>
            </div>
          </article>
        ))}
      </main>

      {/* Modal de Reserva Conectado a Django (HU-01, HU-05, HU-09) */}
      {modalAbierto && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 className="font-serif" style={{ fontSize: '1.35rem', color: '#eab32e' }}>
                Reservar Cita en Línea
              </h2>
              <button
                onClick={() => setModalAbierto(false)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleConfirmarCita}>
              <div className="form-group">
                <label>Sucursal (Atelier)</label>
                <select value={sucursalSel} onChange={(e) => setSucursalSel(e.target.value)} required>
                  {sucursalesApi.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.comuna} — {s.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Especialista</label>
                <select value={especialistaSel} onChange={(e) => setEspecialistaSel(e.target.value)} required>
                  {especialistasApi.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.nombre_completo} ({e.sucursal_comuna})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Servicio</label>
                <select value={servicioSel} onChange={(e) => setServicioSel(e.target.value)} required>
                  {serviciosApi.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.nombre} — {srv.duracion_minutos} min (${srv.precio.toLocaleString('es-CL')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Fecha y Hora</label>
                <input
                  type="datetime-local"
                  value={fechaHora}
                  onChange={(e) => setFechaHora(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nombre Completo</label>
                <input type="text" placeholder="Ej: Juan Pérez" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Teléfono Móvil (WhatsApp / SMS)</label>
                <input type="tel" placeholder="+56 9 8765 4321" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Correo Electrónico</label>
                <input type="email" placeholder="cliente@correo.cl" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
              </div>

              {/* Consentimiento expreso NO premarcado (Ley N.° 21.719 / HU-09) */}
              <div className="consent-box">
                <input
                  type="checkbox"
                  id="consent-ley"
                  checked={consentimiento}
                  onChange={(e) => setConsentimiento(e.target.checked)}
                  style={{ marginTop: '3px', width: '16px', height: '16px' }}
                />
                <label htmlFor="consent-ley" style={{ margin: 0, cursor: 'pointer' }}>
                  <ShieldCheck size={14} style={{ display: 'inline', color: '#eab32e' }} /> Acepto
                  expresamente el tratamiento de mis datos personales para gestionar esta cita y recibir
                  recordatorios conforme a la <strong>Ley N.° 21.719</strong> (Política v1.0-2026).
                </label>
              </div>

              <button
                type="submit"
                className="btn-gold"
                disabled={enviando}
                style={{ width: '100%', justifyContent: 'center', borderRadius: '10px', padding: '0.85rem' }}
              >
                {enviando ? 'VERIFICANDO DISPONIBILIDAD...' : 'CONFIRMAR RESERVA'}
              </button>
            </form>

            {errorMsg && <div className="alert-conflict">{errorMsg}</div>}

            {mensajeOk && (
              <div className="alert-success">
                <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
                {mensajeOk}
              </div>
            )}

            {alternativasVecinas !== null && (
              <div className="alert-conflict">
                <div style={{ fontWeight: 'bold', marginBottom: '0.4rem' }}>
                  <AlertTriangle size={15} style={{ display: 'inline', marginRight: '5px' }} />
                  Horario no disponible en esta sucursal.
                </div>
                {alternativasVecinas.length > 0 ? (
                  <div>
                    <p style={{ marginBottom: '0.5rem' }}>Disponibilidad inmediata en sucursal cercana:</p>
                    {alternativasVecinas.map((alt) => (
                      <button
                        key={alt.especialista_id}
                        type="button"
                        className="btn-gold"
                        style={{ fontSize: '0.78rem', padding: '0.4rem 0.8rem', marginBottom: '0.3rem' }}
                        onClick={() => {
                          setEspecialistaSel(alt.especialista_id);
                          setSucursalSel(alt.sucursal_id);
                          setAlternativasVecinas(null);
                        }}
                      >
                        Reservar en {alt.sucursal} con {alt.especialista}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p>Por favor selecciona otro horario disponible.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}