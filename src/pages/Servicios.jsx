import { useState } from 'react';
import { Clock, Scissors, Coffee, Car, Brain, ShieldCheck, MessageCircle, CheckCircle2, Palette } from 'lucide-react';

const SERVICIOS = [
  { 
    id: 1, cat: 'MASCULINO', 
    nombre: 'Corte Signature & Fade', 
    desc: 'Diagnóstico de visagismo fisonómico, degradado artesanal de precisión a tijera y máquina cóncava, lavado exfoliante de eucalipto con masaje de cuero cabelludo y peinado de acabado mate con cera mineral.', 
    precio: 26000, tiempo: 50, 
    img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 2, cat: 'RITUAL', 
    nombre: 'Afeitado Imperial a Navaja', 
    desc: 'El ritual clásico por excelencia: doble toalla caliente infusionada con aceites esenciales de cedro, espumado tradicional en tazón térmico, afeitado a navaja de acero Solingen y bálsamo hidro-calmante con toalla helada de menta.', 
    precio: 22000, tiempo: 45, 
    img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 3, cat: 'FEMENINO', 
    nombre: 'Corte Editorial & Peinado', 
    desc: 'Consulta de estilo fisonómico y textura capilar, corte milimétrico en húmedo y seco, lavado sensorial de orquídeas y keratina pura, culminando en un brushing con ondas pulidas o acabado liso espejo de alta fijación.', 
    precio: 38000, tiempo: 60, 
    img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 4, cat: 'FEMENINO', 
    nombre: 'Balayage & Babylights Couture', 
    desc: 'Técnica francesa a mano alzada para crear transiciones de luz naturales y dimensionales. Incluye plex reconstructor de enlaces moleculares, tonalización personalizada gloss de brillo extremo y peinado final.', 
    precio: 85000, tiempo: 150, 
    img: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 5, cat: 'UNISEX', 
    nombre: 'Ritual Botánico de Brillo & Nutrición', 
    desc: 'Tratamiento intensivo con infusión de aceite de argán virgen, ácido hialurónico capilar y extracto de té blanco. Sellado con vapor ozonizado y fototerapia LED para recuperar suavidad y sellado de cutículas.', 
    precio: 42000, tiempo: 50, 
    img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 6, cat: 'MASCULINO', 
    nombre: 'Perfilado de Barba & Spa Facial', 
    desc: 'Esculpido milimétrico de líneas en pómulos y cuello, degradado de volumen, vapor ozonizado para apertura de poros, exfoliación con micropartículas de café orgánico e hidratación con serum de jojoba.', 
    precio: 18000, tiempo: 35, 
    img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop' 
  },
];

export default function Servicios({ onBookingClick }) {
  const [filtro, setFiltro] = useState('TODOS');

  const filtrados = SERVICIOS.filter(s => filtro === 'TODOS' || s.cat === filtro);

  return (
    <div style={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#f5f1e8', paddingBottom: '80px' }}>
      
      {/* Hero Servicios */}
      <div style={{ textAlign: 'center', padding: '80px 20px 40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid #c9a227', color: '#c9a227', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '20px' }}>
          <Scissors size={14} /> ATELIER CAPILAR & ALTA BARBERÍA
        </div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '4rem', margin: '0 0 20px 0', fontWeight: 'normal' }}>
          Catálogo de Servicios & Estilos
        </h1>
        <p style={{ color: '#b8c3cc', maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Maestría artesanal sin distinción de género. Fusionamos el ritual clásico de las antiguas barberías europeas con la sofisticación contemporánea de la alta peluquería unisex en Santiago de Chile.
        </p>
      </div>

      {/* Iconos de Resumen (Cortes, Rituales, Color, Barista) */}
      <div style={{ maxWidth: '1280px', margin: '0 auto 50px auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', padding: '0 20px' }}>
        <div style={{ background: '#181a1f', padding: '25px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #22252b' }}>
          <Scissors size={28} color="#c9a227" />
          <div><h3 style={{ margin: 0, fontSize: '1rem' }}>Cortes a Medida</h3><p style={{ margin: 0, color: '#b8c3cc', fontSize: '0.8rem' }}>Visagismo personalizado</p></div>
        </div>
        <div style={{ background: '#181a1f', padding: '25px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #22252b' }}>
          <ShieldCheck size={28} color="#c9a227" />
          <div><h3 style={{ margin: 0, fontSize: '1rem' }}>Rituales Orgánicos</h3><p style={{ margin: 0, color: '#b8c3cc', fontSize: '0.8rem' }}>Botánica & Cuero cabelludo</p></div>
        </div>
        <div style={{ background: '#181a1f', padding: '25px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #22252b' }}>
          <Palette size={28} color="#c9a227" />
          <div><h3 style={{ margin: 0, fontSize: '1rem' }}>Color & Luz</h3><p style={{ margin: 0, color: '#b8c3cc', fontSize: '0.8rem' }}>Balayage & Tonalización</p></div>
        </div>
        <div style={{ background: '#181a1f', padding: '25px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #22252b' }}>
          <Coffee size={28} color="#c9a227" />
          <div><h3 style={{ margin: 0, fontSize: '1rem' }}>Club Barista</h3><p style={{ margin: 0, color: '#b8c3cc', fontSize: '0.8rem' }}>Café de especialidad & bar</p></div>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap', padding: '0 20px' }}>
        {['TODOS', 'MASCULINO', 'FEMENINO', 'UNISEX', 'RITUAL'].map(f => (
          <button 
            key={f} 
            onClick={() => setFiltro(f)} 
            style={{ 
              background: filtro === f ? '#c9a227' : '#181a1f', 
              color: filtro === f ? '#000' : '#b8c3cc', 
              border: filtro === f ? '1px solid #c9a227' : '1px solid #22252b', 
              padding: '12px 24px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', transition: 'all 0.2s'
            }}
          >
            {f === 'TODOS' ? 'Todos los Servicios' : f}
          </button>
        ))}
      </div>

      {/* Grilla de Servicios */}
      <div style={{ maxWidth: '1280px', margin: '0 auto 60px auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', padding: '0 20px' }}>
        {filtrados.map(s => (
          <div key={s.id} style={{ background: '#181a1f', borderRadius: '16px', overflow: 'hidden', border: '1px solid #22252b', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ position: 'relative', height: '220px' }}>
              <img src={s.img} alt={s.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{ position: 'absolute', top: '15px', left: '15px', background: '#c9a227', color: '#000', padding: '4px 12px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>{s.cat}</span>
              <span style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12}/> {s.tiempo} min</span>
            </div>

            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', margin: '0 0 15px 0', fontWeight: 'normal', lineHeight: '1.2' }}>{s.nombre}</h3>
              <p style={{ color: '#b8c3cc', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '30px', flex: 1 }}>{s.desc}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #22252b', paddingTop: '20px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', marginBottom: '2px' }}>INVERSIÓN</div>
                  <div style={{ fontSize: '1.4rem', color: '#c9a227', fontWeight: 'bold' }}>${s.precio.toLocaleString('es-CL')} <span style={{ fontSize: '0.8rem', color: '#b8c3cc' }}>CLP</span></div>
                </div>
                <button 
                  onClick={() => onBookingClick('')}
                  style={{ background: '#c9a227', color: '#000', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
                  RESERVAR CITA
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tarjeta de Transparencia */}
      <div style={{ maxWidth: '1280px', margin: '0 auto 60px auto', background: '#181a1f', borderRadius: '16px', padding: '30px', border: '1px solid #22252b', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <div style={{ background: '#123a5a', padding: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShieldCheck size={24} color="#fff" />
        </div>
        <div>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Transparencia y Hospitalidad Barber Club & Beauty</h3>
          <p style={{ margin: 0, color: '#b8c3cc', fontSize: '0.95rem', lineHeight: '1.6' }}>
            <strong>Nota:</strong> Los valores indicados son estrictamente informativos y no requieren pago anticipado online. Los servicios adicionales, upgrades de tratamiento o productos complementarios solicitados durante su atención se agregarán al momento de pagar en caja/recepción de su atelier.
          </p>
        </div>
      </div>

      {/* Sección de Beneficios (Hospitalidad) */}
      <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 20px' }}>
        <div style={{ color: '#c9a227', fontSize: '12px', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '10px' }}>HOSPITALIDAD DE ATELIER</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '3rem', margin: '0 0 15px 0', fontWeight: 'normal' }}>Experiencias y Beneficios Incluidos</h2>
        <p style={{ color: '#b8c3cc', maxWidth: '800px', margin: '0 auto', fontSize: '1rem' }}>Cada cita en nuestros 4 ateliers incluye privilegios diseñados para su confort absoluto sin costo adicional.</p>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto 80px auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', padding: '0 20px' }}>
        <div style={{ background: '#181a1f', borderRadius: '16px', padding: '40px', border: '1px solid #22252b' }}>
          <div style={{ background: '#22252b', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <Coffee size={24} color="#c9a227" />
          </div>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', margin: '0 0 15px 0', fontWeight: 'normal' }}>Barista & Coctelería de Cortesía</h3>
          <p style={{ color: '#b8c3cc', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>Disfrute a su llegada de nuestra carta de café de especialidad de grano tostado fresco, infusiones herbales orgánicas, whisky single malt, gin tonic artesanal o espumante de bienvenida.</p>
          <div style={{ color: '#c9a227', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle2 size={14}/> INCLUIDO EN TODAS LAS ATENCIONES</div>
        </div>
        <div style={{ background: '#181a1f', borderRadius: '16px', padding: '40px', border: '1px solid #22252b' }}>
          <div style={{ background: '#22252b', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <Brain size={24} color="#c9a227" />
          </div>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', margin: '0 0 15px 0', fontWeight: 'normal' }}>Diagnóstico Capilar y Visagismo</h3>
          <p style={{ color: '#b8c3cc', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>Evaluación preliminar microscópica de fibra capilar y salud del cuero cabelludo, acompañada por asesoría fisonómica para seleccionar el corte y tono que realce sus rasgos únicos.</p>
          <div style={{ color: '#c9a227', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle2 size={14}/> REALIZADO POR MAESTROS TITULADOS</div>
        </div>
        <div style={{ background: '#181a1f', borderRadius: '16px', padding: '40px', border: '1px solid #22252b' }}>
          <div style={{ background: '#22252b', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <Car size={24} color="#c9a227" />
          </div>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', margin: '0 0 15px 0', fontWeight: 'normal' }}>Valet Parking en los 4 Ateliers</h3>
          <p style={{ color: '#b8c3cc', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>Llegue con tranquilidad absoluta a nuestras sedes de Las Condes (El Golf), Vitacura (Alonso de Córdova), Providencia y La Dehesa. Nuestro personal cuidará de su vehículo en recintos privados.</p>
          <div style={{ color: '#c9a227', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle2 size={14}/> SEGURIDAD & MONITOREO 24/7</div>
        </div>
      </div>

      {/* Bloque Final VIP */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', background: '#181a1f', borderRadius: '16px', padding: '40px', border: '1px solid #22252b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '30px' }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{ color: '#c9a227', fontSize: '12px', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '10px' }}>CONCIERGE & RESERVAS VIP</div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', margin: '0 0 15px 0', fontWeight: 'normal' }}>¿Desea una experiencia a puerta cerrada o ritual grupal?</h2>
          <p style={{ color: '#b8c3cc', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>Coordine con nuestro Concierge privado para atenciones nupciales, eventos privados de empresa, o reserve su cita individual directamente en línea con su Maestro o Estilista de preferencia.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {/* 👇 AQUÍ ESTÁ TU NÚMERO 👇 */}
          <a 
            href="https://wa.me/56972236891?text=Hola,%20necesito%20asesoría%20con%20el%20Concierge%20VIP" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ background: 'transparent', color: '#fff', border: '1px solid #333', padding: '15px 25px', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', textDecoration: 'none' }}
          >
            <MessageCircle size={18} /> WHATSAPP CONCIERGE
          </a>
          
          <button 
            onClick={() => onBookingClick('')}
            style={{ background: '#c9a227', color: '#000', border: 'none', padding: '15px 25px', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>
            RESERVAR CITA AHORA
          </button>
        </div>
      </div>

    </div>
  );
}