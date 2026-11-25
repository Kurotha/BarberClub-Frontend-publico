import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scissors, Hourglass, Leaf, GlassWater, Target, Clock, MapPin, Phone, Car, Calendar } from 'lucide-react';
import MapaSucursal from '../components/Mapa/MapaSucursal';

export default function Inicio({ onBookingClick }) {
  // Cambiamos el estado inicial al ID 1 (Providencia) para que coincida
  const [sucursalActiva, setSucursalActiva] = useState(1);

  const verMapaSucursal = (sucursal) => {
    const destino = encodeURIComponent(`${sucursal.direccion}, Santiago, Chile`);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${destino}`,
      '_blank',
      'noopener,noreferrer'
    );

    document.querySelector('[data-sucursal-mapa]')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const serviciosInicio = [
    {
      etiqueta: 'FIRMA UNISEX',
      titulo: 'Corte de Autor BarberClub (Unisex)',
      desc: 'Diagnóstico capilar y morfológico personalizado para damas y caballeros, lavado botánico exfoliante con romero, corte a tijera o navaja y brushing con finalizado de autor.',
      precio: '32.000',
      tiempo: '50 min',
      boton: 'Agendar Tratamiento'
    },
    {
      etiqueta: 'FIRMA TRADICIONAL',
      titulo: 'Ritual Imperial de Afeitado a Navaja',
      desc: 'Apertura de poros mediante toallas calientes infundidas con vapor de eucalipto, afeitado a doble pasada con navaja de hoja de acero alemán, masaje con piedras frías y loción hemostática.',
      precio: '38.000',
      tiempo: '50 min',
      boton: 'Agendar Tratamiento'
    },
    {
      etiqueta: 'PELUQUERÍA & SPA',
      titulo: 'Color, Brushing & Spa Capilar',
      desc: 'Iluminación o matizado sutil, nutrición profunda con aceites orgánicos de argán y ozonoterapia capilar, sellado térmico y peinado profesional para cualquier largo.',
      precio: '45.000',
      tiempo: '60 min',
      boton: 'Agendar Tratamiento'
    },
    {
      etiqueta: 'EXPERIENCIA COMPLETA',
      titulo: 'BarberClub Ritual Integral Unisex',
      desc: 'Corte de autor a medida, sesión de tratamiento capilar restaurador profundo o afeitado a toalla caliente, masaje craneal relajante y peinado final de pasarela.',
      precio: '62.000',
      tiempo: '90 min',
      boton: 'Reservar Pack'
    }
  ];

  // 👇 CAMBIAMOS LOS ID DE TEXTO A NÚMEROS PARA QUE COINCIDAN CON EL MODAL 👇
  const sucursales = [
    {
      id: 1, // Providencia
      nombre: 'Providencia — P. de Valdivia',
      badge: 'ATELIER PATRIMONIAL • BARRIO RESIDENCIAL',
      titulo: 'BarberClub Pedro de Valdivia — Providencia',
      desc: 'Casona de conservación arquitectónica restaurada con sillones de barbería Koken de 1950 y jardín botánico interior para degustación de café arábico.',
      direccion: 'Av. Pedro de Valdivia 1025 • Providencia',
      horario: 'Lunes a Sábado: 09:00 — 20:00 • Domingos: Cerrado',
      telefono: '+56 9 4829 9003 • Concierge Providencia',
      coordenadas: [-33.4333, -70.6167]
    },
    {
      id: 2, // Las Condes
      nombre: 'Las Condes — El Golf',
      badge: 'ATELIER PREMIUM • BARRIO FINANCIERO',
      titulo: 'BarberClub Isidora Goyenechea — Las Condes',
      desc: 'Un espacio de alta costura capilar en el corazón financiero de Santiago, equipado con tecnología de vanguardia y sillones Koken.',
      direccion: 'Av. Isidora Goyenechea 3120, Penthouse',
      horario: 'Lunes a Sábado: 09:00 — 20:00 • Domingos: Cerrado',
      telefono: '+56 9 4829 9001 • Concierge Las Condes',
      coordenadas: [-33.4167, -70.6000]
    },
    {
      id: 3, // Vitacura
      nombre: 'Vitacura — Alonso de Córdova',
      badge: 'ATELIER BOUTIQUE • ZONA EXCLUSIVA',
      titulo: 'BarberClub Alonso de Córdova — Vitacura',
      desc: 'Un refugio íntimo y exclusivo rodeado de galerías de arte y diseño, ideal para una experiencia de relax profundo.',
      direccion: 'Av. Alonso de Córdova 3890',
      horario: 'Lunes a Sábado: 09:00 — 20:00 • Domingos: Cerrado',
      telefono: '+56 9 4829 9002 • Concierge Vitacura',
      coordenadas: [-33.4000, -70.5833]
    },
    {
      id: 4, // Lo Barnechea
      nombre: 'Lo Barnechea — La Dehesa',
      badge: 'ATELIER RESORT • ENTORNO NATURAL',
      titulo: 'BarberClub El Rodeo — Lo Barnechea',
      desc: 'El equilibrio perfecto entre naturaleza y alta peluquería, con vistas al valle y un ambiente de absoluta desconexión.',
      direccion: 'Av. El Rodeo 12850',
      horario: 'Lunes a Sábado: 09:00 - 20:00 • Domingos: Cerrado',
      telefono: '+56 9 4829 9004 • Concierge Lo Barnechea',
      coordenadas: [-33.3667, -70.5167]
    }
  ];

  return (
    <div style={{ backgroundColor: '#0d0d0d', color: '#f5f1e8' }}>
      
      {/* SECCIÓN 1: Hero Principal */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', maxWidth: '1280px', margin: '0 auto', padding: '80px 20px 40px', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#22252b', border: '1px solid #c9a227', color: '#c9a227', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', letterSpacing: '2px', marginBottom: '30px', fontWeight: 'bold' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#c9a227' }}></span>
            ATELIER UNISEX • BARBERÍA & PELUQUERÍA
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '4.5rem', lineHeight: '1.1', margin: '0 0 25px 0', fontWeight: 'normal' }}>
            El Arte del Corte & Estilismo <br /> Unisex de Élite
          </h1>
          <p style={{ color: '#b8c3cc', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '40px', maxWidth: '95%' }}>
            Una experiencia integral que fusiona la barbería clásica y la alta peluquería unisex: cortes de tendencia para damas y caballeros, coloración experta, spa capilar y afeitado artesanal en un entorno de máxima discreción y confort.
          </p>
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div>
                <div style={{ color: '#c9a227', fontSize: '1.2rem', letterSpacing: '2px' }}>★★★★★</div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>4.9 / 5.0</div>
                <div style={{ color: '#888', fontSize: '0.8rem' }}>+1,200 Distinguidos Clientes</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#181a1f', padding: '15px 25px', borderRadius: '12px', border: '1px solid #22252b' }}>
              <ShieldCheck size={28} color="#c9a227" />
              <div>
                <div style={{ fontWeight: 'bold' }}>Maestros Certificados</div>
                <div style={{ color: '#888', fontSize: '0.8rem' }}>Gremio de Londres & Milán</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop" alt="Barbería" style={{ width: '100%', borderRadius: '24px', objectFit: 'cover', height: '600px', display: 'block' }} />
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'rgba(13, 13, 13, 0.9)', backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #333' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#c9a227', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Scissors size={22} color="#000" />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Ritual de Bienvenida</div>
                <div style={{ color: '#888', fontSize: '0.9rem' }}>Whisky Single Malt • Cortesía</div>
              </div>
            </div>
            <div style={{ background: '#123a5a', color: '#fff', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>VIP</div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: Tarjetas de Estadísticas */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div style={{ background: '#181a1f', padding: '30px', borderRadius: '16px', border: '1px solid #22252b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Hourglass size={24} color="#c9a227" />
            <span style={{ color: '#c9a227', fontSize: '2.5rem', fontFamily: 'Georgia, serif' }}>15+</span>
          </div>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>Años de Maestría</h3>
          <p style={{ margin: 0, color: '#b8c3cc', fontSize: '0.9rem', lineHeight: '1.5' }}>Técnicas londinenses depuradas transmitidas entre generaciones de artesanos navajeros.</p>
        </div>
        <div style={{ background: '#181a1f', padding: '30px', borderRadius: '16px', border: '1px solid #22252b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Leaf size={24} color="#c9a227" />
            <span style={{ color: '#c9a227', fontSize: '2.5rem', fontFamily: 'Georgia, serif' }}>100%</span>
          </div>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>Apoteca Orgánica</h3>
          <p style={{ margin: 0, color: '#b8c3cc', fontSize: '0.9rem', lineHeight: '1.5' }}>Aceites esenciales destilados en frío, pomadas libres de sulfatos y bálsamos nobles.</p>
        </div>
        <div style={{ background: '#181a1f', padding: '30px', borderRadius: '16px', border: '1px solid #22252b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <GlassWater size={24} color="#c9a227" />
            <span style={{ color: '#c9a227', fontSize: '2.5rem', fontFamily: 'Georgia, serif' }}>VIP</span>
          </div>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>Hospitalidad Exclusiva</h3>
          <p style={{ margin: 0, color: '#b8c3cc', fontSize: '0.9rem', lineHeight: '1.5' }}>Degustación de Whisky escocés single malt y café arábica de especialidad en cada visita.</p>
        </div>
        <div style={{ background: '#181a1f', padding: '30px', borderRadius: '16px', border: '1px solid #22252b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Target size={24} color="#c9a227" />
            <span style={{ color: '#c9a227', fontSize: '2.5rem', fontFamily: 'Georgia, serif' }}>0.1<span style={{ fontSize: '1.2rem' }}>mm</span></span>
          </div>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>Precisión Milimétrica</h3>
          <p style={{ margin: 0, color: '#b8c3cc', fontSize: '0.9rem', lineHeight: '1.5' }}>Cada línea y degradado se esculpe bajo óptica de precisión y navaja de filo de diamante.</p>
        </div>
      </section>

      {/* SECCIÓN 3: Rituales de Distinción y Cuidado */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 20px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ color: '#c9a227', fontSize: '12px', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '10px' }}>LA CARTA DE TRATAMIENTOS</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '3rem', margin: 0, fontWeight: 'normal' }}>Rituales de Distinción y Cuidado</h2>
          </div>
          <p style={{ color: '#b8c3cc', maxWidth: '400px', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Procedimientos diseñados para renovar su presencia y estilo capilar, combinando herboristería botánica, alta peluquería unisex y técnicas clásicas de navaja.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '30px' }}>
          {serviciosInicio.map((srv, index) => (
            <div key={index} style={{ background: '#181a1f', padding: '40px', borderRadius: '16px', border: '1px solid #22252b', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'inline-flex', background: '#3b3210', color: '#c9a227', padding: '6px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '20px', alignSelf: 'flex-start' }}>
                {srv.etiqueta}
              </div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', margin: '0 0 15px 0', fontWeight: 'normal' }}>{srv.titulo}</h3>
              <p style={{ color: '#b8c3cc', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px', flex: 1 }}>{srv.desc}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #22252b', paddingTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ color: '#b8c3cc', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14}/> {srv.tiempo}</span>
                  <span style={{ color: '#c9a227', fontSize: '1.2rem', fontWeight: 'bold' }}>${srv.precio} <span style={{ fontSize: '0.8rem' }}>CLP</span></span>
                </div>
                <Link to="/servicios" style={{ textDecoration: 'none' }}>
                  <button style={{ background: 'transparent', color: '#c9a227', border: 'none', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    {srv.boton} →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 3.5: Botón Ver Carta y Aviso */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px 80px', textAlign: 'center' }}>
        
        <Link to="/servicios" style={{ textDecoration: 'none' }}>
          <button style={{ 
            background: '#22252b', 
            color: '#fff', 
            border: '1px solid #333', 
            padding: '18px 40px', 
            borderRadius: '30px', 
            fontSize: '1rem', 
            fontWeight: 'bold', 
            letterSpacing: '1px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.3s ease'
          }}>
            VER CARTA COMPLETA DE SERVICIOS & CUIDADOS
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </button>
        </Link>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', color: '#b8c3cc', fontSize: '0.85rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          Los servicios o tratamientos adicionales que solicite durante su visita se agregarán al momento de pagar en caja/recepción.
        </div>

      </section>

      {/* SECCIÓN 4: La Filosofía BarberClub */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px 80px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '50px', alignItems: 'center' }}>
          
          {/* Columna Izquierda: Textos */}
          <div>
            <div style={{ color: '#c9a227', fontSize: '12px', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '15px' }}>LA FILOSOFÍA BARBERCLUB</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '3rem', margin: '0 0 25px 0', fontWeight: 'normal', lineHeight: '1.1' }}>
              Más que un corte, un santuario para desconectar
            </h2>
            <p style={{ color: '#b8c3cc', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '40px' }}>
              Diseñado para quienes aprecian el sosiego, los detalles meticulosos y el cuidado capilar sin distinciones. En un entorno moderno y exclusivo, creamos un refugio donde el tiempo se detiene: sillones de diseño restaurados, acústica aislada, luz cálida indirecta y atención personalizada sin prisas.
            </p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, background: '#181a1f', padding: '25px', borderRadius: '12px', border: '1px solid #22252b' }}>
                <div style={{ color: '#c9a227', marginBottom: '15px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 18v-6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path><path d="M6 10V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5"></path></svg>
                </div>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#f5f1e8' }}>Sillones Koken 1950</h3>
                <p style={{ margin: 0, color: '#b8c3cc', fontSize: '0.85rem', lineHeight: '1.5' }}>Reclinación ergonómica con tapizado de piel nubuk para el máximo descanso lumbar.</p>
              </div>
              <div style={{ flex: 1, background: '#181a1f', padding: '25px', borderRadius: '12px', border: '1px solid #22252b' }}>
                <div style={{ color: '#c9a227', marginBottom: '15px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#f5f1e8' }}>Privacidad Acústica</h3>
                <p style={{ margin: 0, color: '#b8c3cc', fontSize: '0.85rem', lineHeight: '1.5' }}>Salones espaciados para sostener conversaciones confidenciales o disfrutar del silencio.</p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Imágenes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <img 
              src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=600&auto=format&fit=crop" 
              alt="Filosofía 1" 
              style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px', marginTop: '40px' }} 
            />
            <img 
              src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=600&auto=format&fit=crop" 
              alt="Filosofía 2" 
              style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px' }} 
            />
          </div>

        </div>
      </section>

      {/* SECCIÓN 5: Red de Ateliers (Locales) */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 20px 100px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ color: '#c9a227', fontSize: '12px', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '10px' }}>RED DE ATELIERS • SANTIAGO DE CHILE</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '3rem', margin: 0, fontWeight: 'normal' }}>En el Epicentro de la Exclusividad</h2>
          </div>
          <p style={{ color: '#b8c3cc', maxWidth: '400px', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Seleccione su atelier de preferencia. Cuatro enclaves estratégicos en Santiago diseñados bajo los más rigurosos estándares de discreción, acústica y confort de lujo.
          </p>
        </div>

        {/* Selector de Sucursales */}
        <div style={{ display: 'flex', background: '#181a1f', borderRadius: '12px', border: '1px solid #22252b', marginBottom: '40px', overflow: 'hidden', flexWrap: 'wrap' }}>
          {sucursales.map((suc) => (
            <button
              key={suc.id}
              onClick={() => setSucursalActiva(suc.id)}
              style={{
                flex: 1, padding: '20px', minWidth: '200px',
                background: sucursalActiva === suc.id ? '#d4af37' : 'transparent',
                color: sucursalActiva === suc.id ? '#000' : '#b8c3cc',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '1px', transition: 'all 0.2s'
              }}
            >
              <MapPin size={16} /> {suc.nombre.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Contenido de la Sucursal Activa */}
        {sucursales.map((suc) => suc.id === sucursalActiva && (
          <div key={suc.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
            
            {/* Tarjeta de Información */}
            <div style={{ background: '#181a1f', borderRadius: '16px', border: '1px solid #22252b', padding: '40px', display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#22252b', color: '#c9a227', padding: '8px 16px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '20px', alignSelf: 'flex-start' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#c9a227' }}></span>
                {suc.badge}
              </div>

              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', margin: '0 0 15px 0', fontWeight: 'normal' }}>{suc.titulo}</h3>
              <p style={{ color: '#b8c3cc', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px' }}>{suc.desc}</p>

              <div style={{ background: '#111318', borderRadius: '12px', padding: '25px', border: '1px solid #22252b', marginBottom: '30px' }}>
                
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                  <MapPin color="#c9a227" size={20} style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#f5f1e8' }}>Dirección & Comuna</div>
                    <div style={{ color: '#c9a227', fontSize: '0.9rem' }}>{suc.direccion}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                  <Clock color="#c9a227" size={20} style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#f5f1e8' }}>Horarios Preferenciales</div>
                    <div style={{ color: '#b8c3cc', fontSize: '0.9rem' }}>{suc.horario}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                  <Phone color="#c9a227" size={20} style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#f5f1e8' }}>Línea Directa & WhatsApp Concierge</div>
                    <div style={{ color: '#c9a227', fontSize: '0.9rem', fontWeight: 'bold' }}>{suc.telefono}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <Car color="#c9a227" size={20} style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#f5f1e8' }}>Servicio Valet Parking</div>
                    <div style={{ color: '#b8c3cc', fontSize: '0.9rem' }}>Plazas de estacionamiento interior custodiadas.</div>
                  </div>
                </div>

              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: 'auto' }}>
                <button 
                  onClick={() => onBookingClick(suc.id)} // 👈 Le pasamos el ID numérico al modal
                  style={{ flex: 1, background: '#c9a227', color: '#000', padding: '15px', borderRadius: '30px', border: 'none', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                  <Calendar size={18} /> RESERVAR EN ESTE ATELIER
                </button>
                <button
                  type="button"
                  onClick={() => verMapaSucursal(suc)}
                  style={{ flex: 1, background: 'transparent', color: '#f5f1e8', padding: '15px', borderRadius: '30px', border: '1px solid #333', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                >
                  <MapPin size={18} /> VER MAPA
                </button>
              </div>

            </div>

            {/* Mapa Real con Leaflet */}
            <div data-sucursal-mapa style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', minHeight: '450px', border: '1px solid #22252b' }}>
                <MapaSucursal 
                  coordenadas={suc.coordenadas} 
                  nombre={suc.titulo} 
                />
            </div>

          </div>
        ))}
      </section>

    </div>
  );
}