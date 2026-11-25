import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid #222', padding: '60px 20px 20px', color: '#b8c3cc', fontSize: '0.9rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
        
        {/* Columna 1: Logo */}
        <div>
          <img src="/barberclub_logo2.png" alt="Logo" style={{ width: '60px', marginBottom: '15px' }} />
          <h3 style={{ fontFamily: 'Georgia, serif', color: '#c9a227', fontSize: '1.8rem', margin: '0 0 15px 0', fontWeight: 'normal' }}>Barber Club & Beauty</h3>
          <p style={{ lineHeight: '1.6' }}>El santuario de la distinción y cuidado capilar sin género. Barbería clásica, alta peluquería unisex y bienestar en un entorno exclusivo.</p>
        </div>

        {/* Columna 2: Horarios */}
        <div>
          <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '20px', fontWeight: 'bold' }}>Horarios de Atención</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span>Lunes — Viernes</span> <span style={{ color: '#c9a227', fontWeight: 'bold' }}>09:00 — 20:30</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span>Sábados de Ritual</span> <span style={{ color: '#c9a227', fontWeight: 'bold' }}>08:30 — 19:00</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Domingos Club VIP</span> <span style={{ color: '#c9a227', fontWeight: 'bold' }}>10:00 — 16:00</span></div>
        </div>

        {/* Columna 3: Ateliers */}
        <div>
          <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '20px', fontWeight: 'bold' }}>Ateliers en Santiago</h4>
          <p style={{ marginBottom: '10px' }}><strong style={{ color: '#fff' }}>Las Condes — El Golf</strong><br/>Av. Isidora Goyenechea 3120</p>
          <p style={{ marginBottom: '10px' }}><strong style={{ color: '#fff' }}>Vitacura — Alonso de Córdova</strong><br/>Av. Alonso de Córdova 3890</p>
          <p style={{ marginBottom: '10px' }}><strong style={{ color: '#fff' }}>Providencia — Pedro de Valdivia</strong><br/>Av. Pedro de Valdivia 1025</p>
          <p style={{ marginBottom: '15px' }}><strong style={{ color: '#fff' }}>Lo Barnechea — La Dehesa</strong><br/>Av. El Rodeo 12850</p>
          <p style={{ color: '#c9a227', fontWeight: 'bold', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}>🚗 Valet Parking de cortesía en los 4 locales</p>
        </div>

        {/* Columna 4: Contacto */}
        <div>
          <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '20px', fontWeight: 'bold' }}>Contacto Directo</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Phone size={16} color="#c9a227"/> <span>+56 9 4829 9001 (Central)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <MapPin size={16} color="#c9a227"/> <span>WhatsApp Concierge 24/7: +56 9 6002 0900</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Mail size={16} color="#c9a227"/> <span>concierge@barberclub.cl</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={16} color="#c9a227"/> <span>Santiago de Chile</span>
          </div>
        </div>
      </div>

      {/* Parte inferior */}
      <div style={{ maxWidth: '1280px', margin: '40px auto 0', borderTop: '1px solid #222', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', fontSize: '0.8rem' }}>
        <span>© 2026 Barber Club & Beauty - Barbería & Peluquería Unisex. Todos los derechos reservados.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span>Privacidad</span>
          <span>Términos del Club</span>
          <span>Garantía de Excelencia</span>
        </div>
      </div>
    </footer>
  );
}