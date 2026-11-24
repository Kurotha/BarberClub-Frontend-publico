import { useEffect, useState } from "react";
import { getActiveServices } from "../api/servicesAPI";
import "../style/Servicios.css"
import ServiceCard from "../components/cards/ServiciosCards";
import { Clock, Scissors, Coffee, Car, Brain, ShieldCheck, MessageCircle, CheckCircle2, Palette } from 'lucide-react';



export default function Servicios({ onBookingClick }) {
  const [services, setServices] = useState([]);
  const [filtro, setFiltro] = useState("TODOS");

    const categorias = [
    "TODOS",
    ...new Set(
      services.map(s => s.categoria)
    )
  ];

const filtrados =
    filtro === "TODOS"
        ? services
        : services.filter(
              servicio =>
                  servicio.categoria?.toUpperCase() === filtro
          );



  useEffect(() => {
    const loadServices = async () => {
      const data =
        await getActiveServices();

      setServices(data);
    };

    loadServices();
  }, []);


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
      <div className="bc-services__grid">

        {filtrados.map(servicio => (
          <ServiceCard
            key={servicio.id}
            servicio={servicio}
            onBooking={onBookingClick}
          />
        ))}

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
          <div style={{ color: '#c9a227', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle2 size={14} /> INCLUIDO EN TODAS LAS ATENCIONES</div>
        </div>
        <div style={{ background: '#181a1f', borderRadius: '16px', padding: '40px', border: '1px solid #22252b' }}>
          <div style={{ background: '#22252b', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <Brain size={24} color="#c9a227" />
          </div>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', margin: '0 0 15px 0', fontWeight: 'normal' }}>Diagnóstico Capilar y Visagismo</h3>
          <p style={{ color: '#b8c3cc', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>Evaluación preliminar microscópica de fibra capilar y salud del cuero cabelludo, acompañada por asesoría fisonómica para seleccionar el corte y tono que realce sus rasgos únicos.</p>
          <div style={{ color: '#c9a227', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle2 size={14} /> REALIZADO POR MAESTROS TITULADOS</div>
        </div>
        <div style={{ background: '#181a1f', borderRadius: '16px', padding: '40px', border: '1px solid #22252b' }}>
          <div style={{ background: '#22252b', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <Car size={24} color="#c9a227" />
          </div>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', margin: '0 0 15px 0', fontWeight: 'normal' }}>Valet Parking en los 4 Ateliers</h3>
          <p style={{ color: '#b8c3cc', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>Llegue con tranquilidad absoluta a nuestras sedes de Las Condes (El Golf), Vitacura (Alonso de Córdova), Providencia y La Dehesa. Nuestro personal cuidará de su vehículo en recintos privados.</p>
          <div style={{ color: '#c9a227', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle2 size={14} /> SEGURIDAD & MONITOREO 24/7</div>
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