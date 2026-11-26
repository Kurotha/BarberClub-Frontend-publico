import { useState } from 'react';
import { MapPin, Clock, Phone, Car, Calendar } from 'lucide-react';
import MapaSucursal from '../components/Mapa/MapaSucursal';

const SUCURSALES = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
    nombre: 'Lo Barnechea — La Dehesa',
    badge: 'ATELIER RESORT • ENTORNO NATURAL',
    titulo: 'BarberClub El Rodeo — Lo Barnechea',
    desc: 'El equilibrio perfecto entre naturaleza y alta peluquería, con vistas al valle y un ambiente de absoluta desconexión.',
    direccion: 'Av. El Rodeo 12850',
    horario: 'Lunes a Sábado: 09:00 - 20:00 • Domingos: Cerrado',
    telefono: '+56 9 4829 9004 • Concierge Lo Barnechea',
    coordenadas: [-33.3667, -70.5167]
  },
];

export default function Locales({ onBookingClick }) {
  const [sucursalActiva, setSucursalActiva] = useState(SUCURSALES[0].id);

  return (
    <div style={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#f5f1e8', padding: '60px 20px 100px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Hero */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ color: '#c9a227', fontSize: '12px', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '10px' }}>RED DE ATELIERS • SANTIAGO DE CHILE</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '4rem', margin: '0 0 20px 0', fontWeight: 'normal' }}>Nuestros Ateliers</h1>
          <p style={{ color: '#b8c3cc', maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Cuatro enclaves estratégicos en Santiago diseñados bajo los más rigurosos estándares de discreción, acústica y confort de lujo.
          </p>
        </div>

        {/* Selector de Sucursales */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', background: '#181a1f', padding: '10px', borderRadius: '12px', flexWrap: 'wrap' }}>
          {SUCURSALES.map(s => (
            <button key={s.id} onClick={() => setSucursalActiva(s.id)} style={{ 
              flex: 1, background: sucursalActiva === s.id ? '#c9a227' : 'transparent', 
              color: sucursalActiva === s.id ? '#000' : '#b8c3cc', 
              border: 'none', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.9rem', minWidth: '200px'
            }}>
              <MapPin size={16}/> {s.nombre.split('—')[0].toUpperCase()}
            </button>
          ))}
        </div>

        {/* Contenido de la Sucursal Activa */}
        {SUCURSALES.map((suc) => suc.id === sucursalActiva && (
          <div key={suc.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
            
            <div style={{ background: '#181a1f', borderRadius: '16px', border: '1px solid #22252b', padding: '40px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#22252b', color: '#c9a227', padding: '8px 16px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '20px', alignSelf: 'flex-start' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#c9a227' }}></span> {suc.badge}
              </div>

              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', margin: '0 0 15px 0', fontWeight: 'normal' }}>{suc.titulo}</h3>
              <p style={{ color: '#b8c3cc', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px' }}>{suc.desc}</p>

              <div style={{ background: '#111318', borderRadius: '12px', padding: '25px', border: '1px solid #22252b', marginBottom: '30px' }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                  <MapPin color="#c9a227" size={20} />
                  <div><div style={{ fontWeight: 'bold' }}>Dirección</div><div style={{ color: '#c9a227', fontSize: '0.9rem' }}>{suc.direccion}</div></div>
                </div>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                  <Clock color="#c9a227" size={20} />
                  <div><div style={{ fontWeight: 'bold' }}>Horarios</div><div style={{ color: '#b8c3cc', fontSize: '0.9rem' }}>{suc.horario}</div></div>
                </div>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                  <Phone color="#c9a227" size={20} />
                  <div><div style={{ fontWeight: 'bold' }}>Contacto</div><div style={{ color: '#c9a227', fontSize: '0.9rem', fontWeight: 'bold' }}>{suc.telefono}</div></div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <Car color="#c9a227" size={20} />
                  <div><div style={{ fontWeight: 'bold' }}>Valet Parking</div><div style={{ color: '#b8c3cc', fontSize: '0.9rem' }}>Plazas de estacionamiento interior custodiadas.</div></div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: 'auto' }}>
                <button onClick={() => onBookingClick(suc.id)} style={{ flex: 1, background: '#c9a227', color: '#000', padding: '15px', borderRadius: '30px', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                  <Calendar size={18} /> RESERVAR EN ESTE ATELIER
                </button>
              </div>
            </div>

            <div style={{ borderRadius: '16px', overflow: 'hidden', minHeight: '450px', border: '1px solid #22252b' }}>
              <MapaSucursal coordenadas={suc.coordenadas} nombre={suc.titulo} />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}