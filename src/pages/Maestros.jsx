import { useState } from 'react';
import { Award, Calendar, MapPin, Sparkles, UserCheck, Coffee, MessageCircle, CheckCircle } from 'lucide-react'; // 👈 Agregué CheckCircle

const PERFILES = [
  { nombre: 'Don Vincenzo Morales', comuna: 'Las Condes', local: 'El Golf', disciplina: 'BARBERIA', cargo: 'Master Barber & Tradición Solingen', academia: 'Formación en Milán y Sevilla', exp: '22 años de trayectoria', bio: 'Especialista en afeitado imperial a navaja barbera clásica, degradados artesanales a peine y tijera, y esculpido de barba.', tags: ['Afeitado a Navaja', 'Corte Clásico Tijera', 'Perfilado Imperial'], foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
  { nombre: 'Camila Valenzuela', comuna: 'Vitacura', local: 'Alonso de Córdova', disciplina: 'UNISEX', cargo: 'Master Hair Colorist & Balayage Couture', academia: 'Certificación L’Oréal Professionnel París', exp: '14 años de trayectoria', bio: 'Pionera en técnicas de babylights a mano alzada, corrección de color compleja y diseño de cortes en capas de alto movimiento.', tags: ['Balayage Couture', 'Visagismo Capilar', 'Terapia Plex'], foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop' },
  { nombre: 'Mateo Sandoval', comuna: 'Providencia', local: 'Pedro de Valdivia', disciplina: 'BARBERIA', cargo: 'Senior Barber & Especialista en Fades', academia: 'Barbershop World Tour Ambassador', exp: '10 años de trayectoria', bio: 'Experto en texturizado contemporáneo, low y mid fades con máquina cóncava, diseños geométricos limpios y rituales de vapor.', tags: ['Skin Fade', 'Texturizado Urbano', 'Spa Facial'], foto: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop' },
  { nombre: 'Éléonore Dupont', comuna: 'Lo Barnechea', local: 'La Dehesa', disciplina: 'UNISEX', cargo: 'Directora Creativa & Maestra de Estilo', academia: 'Ex Atelier Jean Louis David París', exp: '18 años de trayectoria', bio: 'Referente en corte editorial en seco y húmedo, brushing de fijación prolongada y tratamientos de botánica regenerativa.', tags: ['Corte Editorial', 'Brushing Glam', 'Nutrición Botánica'], foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop' },
  { nombre: 'Sebastián Krause', comuna: 'Las Condes', local: 'El Golf', disciplina: 'BARBERIA', cargo: 'Maestro Barbero & Visagismo Facial', academia: 'Formado en Buenos Aires', exp: '12 años de experiencia', bio: 'Dominio de cortes crop texturizados, perfilado de patillas y barba con toalla caliente infusionada en cedro y styling.', tags: ['Textured Crop', 'Tratamiento Barba', 'Ritual Toalla'], foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' },
  { nombre: 'Valentina Restrepo', comuna: 'Vitacura', local: 'Alonso de Córdova', disciplina: 'UNISEX', cargo: 'Estilista Senior & Bob Architect', academia: 'Sassoon Academy London', exp: '11 años de trayectoria', bio: 'Arquitectura de cortes bob precisos, micro-flequillos y peinados para eventos de etiqueta con asesoría de visagismo.', tags: ['Precision Bob', 'Visagismo Óseo', 'Tratamientos Gloss'], foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop' },
  { nombre: 'Arturo Benavides', comuna: 'Providencia', local: 'Pedro de Valdivia', disciplina: 'BARBERIA', cargo: 'Barbero Tradicional & Masaje Craneal', academia: 'Maestro de la vieja escuela', exp: '16 años de trayectoria', bio: 'Maestría en ritual de afeitado con espuma tibia de brocha tejón y navaja Solingen, complementado con masaje craneal.', tags: ['Afeitado Solingen', 'Shiatsu Craneal', 'Bigote Clásico'], foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
  { nombre: 'Sofía Montalva', comuna: 'Lo Barnechea', local: 'La Dehesa', disciplina: 'UNISEX', cargo: 'Colorista & Terapeuta Capilar', academia: 'Especialista en Alisados Orgánicos', exp: '9 años de trayectoria', bio: 'Tratamientos botánicos de hidratación profunda bajo vapor ozonizado, fototerapia LED capilar y tonalizaciones.', tags: ['Fototerapia LED', 'Coloración Orgánica', 'Detox Capilar'], foto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop' },
];

// 👇 Agregamos onBookingClick a las props 👇
export default function Maestros({ onBookingClick }) {
  const [filtroComuna, setFiltroComuna] = useState('TODAS');
  const [filtroDisciplina, setFiltroDisciplina] = useState('TODAS');

  const perfilesFiltrados = PERFILES.filter((p) => {
    const okComuna = filtroComuna === 'TODAS' || p.comuna === filtroComuna;
    const okDisc = filtroDisciplina === 'TODAS' || p.disciplina === filtroDisciplina;
    return okComuna && okDisc;
  });

  return (
    <div style={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#f5f1e8', paddingBottom: '60px' }}>
      
      {/* Hero */}
      <section style={{ padding: '80px 20px 40px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid #c9a227', color: '#c9a227', background: 'rgba(201, 162, 39, 0.1)', padding: '8px 16px', borderRadius: '20px', fontSize: '11px', letterSpacing: '2px', marginBottom: '25px', fontWeight: 'bold' }}>
          <Sparkles size={14} /> ARTESANOS DEL ESTILO & VISAGISMO
        </div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '4rem', margin: '0 0 20px 0', fontWeight: 'normal', lineHeight: '1.1' }}>
          Maestros Barberos & Diseñadores Capilares
        </h1>
        <p style={{ color: '#b8c3cc', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Un colectivo de talentos con trayectoria internacional, expertos en visagismo fisonómico, técnicas de tijera clásicas, barbería tradicional y alta colorimetría unisex distribuidos en nuestros 4 ateliers en Santiago.
        </p>
        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', marginTop: '35px', fontSize: '0.9rem', fontWeight: 'bold', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={18} color="#c9a227" /> Certificación Internacional</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><UserCheck size={18} color="#c9a227" /> Consultoría de Rostro 100% Personalizada</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Coffee size={18} color="#c9a227" /> Cortesía de Café & Single Malt</span>
        </div>
      </section>

      {/* Filtros */}
      <section style={{ backgroundColor: '#181a1f', padding: '30px', borderRadius: '16px', maxWidth: '1280px', margin: '0 auto 40px auto', border: '1px solid #22252b' }}>
        <div style={{ marginBottom: '15px', fontSize: '11px', letterSpacing: '1px', color: '#b8c3cc', fontWeight: 'bold' }}>FILTRAR POR ATELIER EN SANTIAGO:</div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '25px' }}>
          <button onClick={() => setFiltroComuna('TODAS')} style={{ background: filtroComuna === 'TODAS' ? '#c9a227' : '#22252b', color: filtroComuna === 'TODAS' ? '#000' : '#b8c3cc', padding: '12px 24px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>Todos los Ateliers (8)</button>
          {['Las Condes', 'Vitacura', 'Providencia', 'Lo Barnechea'].map(com => (
            <button key={com} onClick={() => setFiltroComuna(com)} style={{ background: filtroComuna === com ? '#c9a227' : '#22252b', color: filtroComuna === com ? '#000' : '#b8c3cc', padding: '12px 24px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>{com} — {com === 'Las Condes' ? 'El Golf' : com === 'Vitacura' ? 'Alonso de Córdova' : com === 'Providencia' ? 'P. de Valdivia' : 'La Dehesa'} (2)</button>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={() => setFiltroDisciplina('TODAS')} style={{ background: filtroDisciplina === 'TODAS' ? '#123a5a' : 'transparent', color: filtroDisciplina === 'TODAS' ? '#fff' : '#b8c3cc', padding: '10px 20px', borderRadius: '8px', border: filtroDisciplina === 'TODAS' ? '1px solid #123a5a' : '1px solid #333', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>TODAS LAS DISCIPLINAS</button>
            <button onClick={() => setFiltroDisciplina('BARBERIA')} style={{ background: filtroDisciplina === 'BARBERIA' ? '#123a5a' : 'transparent', color: filtroDisciplina === 'BARBERIA' ? '#fff' : '#b8c3cc', padding: '10px 20px', borderRadius: '8px', border: filtroDisciplina === 'BARBERIA' ? '1px solid #123a5a' : '1px solid #333', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>MAESTROS BARBEROS & AFEITADO</button>
            <button onClick={() => setFiltroDisciplina('UNISEX')} style={{ background: filtroDisciplina === 'UNISEX' ? '#123a5a' : 'transparent', color: filtroDisciplina === 'UNISEX' ? '#fff' : '#b8c3cc', padding: '10px 20px', borderRadius: '8px', border: filtroDisciplina === 'UNISEX' ? '1px solid #123a5a' : '1px solid #333', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>ESTILISTAS UNISEX & COLORIMETRÍA</button>
          </div>
          <span style={{ fontSize: '0.85rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80' }}></span> Mostrando {perfilesFiltrados.length} artistas disponibles
          </span>
        </div>
      </section>

      {/* Grilla */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', padding: '0 20px' }}>
        {perfilesFiltrados.map((p) => (
          <article key={p.nombre} style={{ backgroundColor: '#181a1f', borderRadius: '16px', overflow: 'hidden', border: '1px solid #22252b', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '320px' }}>
              <img src={p.foto} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
              <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'rgba(0,0,0,0.8)', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', color: '#c9a227', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}>
                <MapPin size={12}/> {p.comuna} — {p.local}
              </div>
              <div style={{ position: 'absolute', bottom: '15px', left: '15px', background: 'rgba(201, 162, 39, 0.15)', color: '#c9a227', border: '1px solid #c9a227', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                {p.exp}
              </div>
            </div>
            <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', margin: '0 0 5px 0', fontWeight: 'normal', lineHeight: '1.1' }}>{p.nombre}</h3>
              <div style={{ color: '#c9a227', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '5px', lineHeight: '1.3' }}>{p.cargo}</div>
              <div style={{ color: '#b8c3cc', fontSize: '0.85rem', marginBottom: '15px' }}>{p.academia}</div>
              <p style={{ color: '#b8c3cc', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>{p.bio}</p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '25px' }}>
                {p.tags.map(t => <span key={t} style={{ background: '#22252b', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', color: '#b8c3cc', border: '1px solid #333' }}>{t}</span>)}
              </div>
              
              {/* 👇 Botón de reservar conectado 👇 */}
              <button 
                onClick={() => onBookingClick('')}
                style={{ background: '#c9a227', color: '#000', border: 'none', padding: '15px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                RESERVAR CON {p.nombre.replace('Don ', '').split(' ')[0].toUpperCase()} <Calendar size={18} />
              </button>
            </div>
          </article>
        ))}
      </main>

      {/* Bloques Extras */}
      <section style={{ maxWidth: '1280px', margin: '60px auto 0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px', padding: '0 20px' }}>
        <div style={{ background: '#181a1f', padding: '40px', borderRadius: '16px', border: '1px solid #22252b' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#22252b', padding: '8px 16px', borderRadius: '20px', fontSize: '10px', color: '#c9a227', marginBottom: '20px', fontWeight: 'bold', letterSpacing: '1px' }}>PROTOCOLO BARBER CLUB & BEAUTY</div>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', margin: '0 0 15px 0', fontWeight: 'normal' }}>Diagnóstico de Visagismo Incluido</h3>
          <p style={{ color: '#b8c3cc', fontSize: '0.95rem', lineHeight: '1.6' }}>Cada reserva con nuestros maestros incluye 10 minutos de consultoría fisonómica previa para determinar el estilo ideal según tus rasgos, líneas óseas, textura y estructura capilar sin costo adicional.</p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '25px', fontSize: '0.85rem', color: '#c9a227', fontWeight: 'bold', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle size={14}/> Análisis Óseo</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle size={14}/> Prueba de Textura</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle size={14}/> Recomendación Pomada/Cera</span>
          </div>
        </div>
        <div style={{ background: '#123a5a', padding: '40px', borderRadius: '16px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ fontSize: '10px', color: '#c9a227', letterSpacing: '2px', fontWeight: 'bold' }}>ASESORÍA INSTANTÁNEA</div>
            <div style={{ background: '#c9a227', color: '#000', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>WhatsApp 24/7</div>
          </div>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', margin: '0 0 15px 0', fontWeight: 'normal' }}>¿Indeciso sobre qué profesional elegir?</h3>
          <p style={{ color: '#cde7f8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '25px' }}>Contacta a nuestro Concierge VIP para una recomendación a medida según tu ubicación, tipo de cabello y servicio deseado.</p>
          
          {/* 👇 Botón de WhatsApp conectado 👇 */}
          <a 
            href="https://wa.me/56954234739?text=Hola,%20necesito%20asesoría%20con%20el%20Concierge%20VIP" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ background: '#c9a227', color: '#000', border: 'none', padding: '15px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '0.95rem', textDecoration: 'none' }}>
            <MessageCircle size={18} /> HABLAR CON CONCIERGE VIP
          </a>
        </div>
      </section>
    </div>
  );
}