import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Award, Calendar, CheckCircle2, Coffee, MapPin,
  ShieldCheck, Sparkles, UserCheck, X, AlertTriangle
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

export const Reservas = ({ modalAbierto, setModalAbierto }) => {
    const location = useLocation();

    const [sucursalesApi, setSucursalesApi] = useState([]);
  const [especialistasApi, setEspecialistasApi] = useState([]);
  const [serviciosApi, setServiciosApi] = useState([]);

  // Estado Modal Reserva (HU-01 + HU-05 + HU-09)
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

  return (
    <div>
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
  )
}
export default Reservas;