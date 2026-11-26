import { useEffect, useState } from 'react';
import { Award, Calendar, MapPin, Sparkles, UserCheck, Coffee, MessageCircle, CheckCircle } from 'lucide-react'; // 👈 Agregué CheckCircle
import "../style/Maestros.css"
import MaestrosCard from "../components/cards/MaestrosCards";
import { getEspecialistasActivos } from "../api/especialistasAPI";

// 👇 Agregamos onBookingClick a las props 👇
export default function Maestros({ onBookingClick }) {
  const [filtroDisciplina, setFiltroDisciplina] = useState('TODAS');
  const [filtroSucursal, setFiltroSucursal] = useState("TODAS");
  const [especialistas, setEspecialistas] = useState([]);

  useEffect(() => {
    const cargarEspecialistas = async () => {
      try {
        const data = await getEspecialistasActivos();
        setEspecialistas(data);
      } catch (error) {
        console.error(error);
      }
    };

    cargarEspecialistas();
  }, []);

  const disciplinas = [
    "TODAS",
    ...new Set(
      especialistas
        .map(e => e.disciplina)
        .filter(Boolean)
    )
  ];

  const sucursales = [
    "TODAS",
    ...new Set(
      especialistas
        .map(e => e.sucursal_nombre)
        .filter(Boolean)
    )
  ];

  const especialistasFiltrados =
    especialistas.filter((especialista) => {

      const cumpleSucursal =
        filtroSucursal === "TODAS" ||
        especialista.sucursal_nombre === filtroSucursal;

      const cumpleDisciplina =
        filtroDisciplina === "TODAS" ||
        especialista.disciplina?.toUpperCase() === filtroDisciplina;

      return (
        cumpleSucursal &&
        cumpleDisciplina
      );
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
      <section className="maestros-filtros">

        <div className="maestros-filtros__titulo">
          FILTRAR POR ATELIER EN SANTIAGO:
        </div>

        <div className="maestros-filtros__fila maestros-filtros__fila--sucursales">

          {sucursales.map((sucursal) => (

            <button
              key={sucursal}
              onClick={() => setFiltroSucursal(sucursal)}
              className={
                filtroSucursal === sucursal
                  ? "sucursal-btn sucursal-btn--active"
                  : "sucursal-btn"
              }
            >
              {sucursal === "TODAS"
                ? "Todos los Ateliers"
                : sucursal}
            </button>

          ))}

        </div>


        <div className="maestros-filtros__fila">

          {disciplinas.map((disciplina) => (

            <button
              key={disciplina}
              onClick={() => setFiltroDisciplina(disciplina)}
              className={
                filtroDisciplina === disciplina
                  ? "disciplina-btn disciplina-btn--active"
                  : "disciplina-btn"
              }
            >
              {disciplina === "TODAS"
                ? "TODAS LAS DISCIPLINAS"
                : disciplina}
            </button>

          ))}

        </div>
        <div className="maestros-filtros__footer">

          <div className="maestros-filtros__fila">

          </div>

          <span className="maestros-filtros__contador">
            <span className="maestros-filtros__contador-dot"></span>
            Mostrando {especialistasFiltrados.length} artistas disponibles
          </span>

        </div>




      </section >

      {/* Grilla */}
      < main className="maestros-grid" >
        {
          especialistasFiltrados.map((especialista) => (
            <MaestrosCard
              key={especialista.id}
              especialista={especialista}
              onBooking={onBookingClick}
            />
          ))
        }
      </main >

      {/* Bloques Extras */}
      < section style={{ maxWidth: '1280px', margin: '60px auto 0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px', padding: '0 20px' }
      }>
        <div style={{ background: '#181a1f', padding: '40px', borderRadius: '16px', border: '1px solid #22252b' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#22252b', padding: '8px 16px', borderRadius: '20px', fontSize: '10px', color: '#c9a227', marginBottom: '20px', fontWeight: 'bold', letterSpacing: '1px' }}>PROTOCOLO BARBER CLUB & BEAUTY</div>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', margin: '0 0 15px 0', fontWeight: 'normal' }}>Diagnóstico de Visagismo Incluido</h3>
          <p style={{ color: '#b8c3cc', fontSize: '0.95rem', lineHeight: '1.6' }}>Cada reserva con nuestros maestros incluye 10 minutos de consultoría fisonómica previa para determinar el estilo ideal según tus rasgos, líneas óseas, textura y estructura capilar sin costo adicional.</p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '25px', fontSize: '0.85rem', color: '#c9a227', fontWeight: 'bold', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle size={14} /> Análisis Óseo</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle size={14} /> Prueba de Textura</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle size={14} /> Recomendación Pomada/Cera</span>
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
      </section >
    </div >
  );
}
