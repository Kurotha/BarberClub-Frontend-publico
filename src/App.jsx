import { useState } from 'react';
import Navbar from './components/navbar/navbar';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Maestros from './pages/Maestros';
import Servicios from './pages/Servicios';
import Reservas from './components/reservas/Reservas';

function AppLayout() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [sucursalPrevia, setSucursalPrevia] = useState('');

  const abrirModalReserva = (sucursalId = '') => {
    setSucursalPrevia(sucursalId); 
    setModalAbierto(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onBookingClick={() => abrirModalReserva('')} />
      
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Inicio onBookingClick={abrirModalReserva} />} />
          
          {/* 👇 AQUÍ ESTÁ EL CAMBIO: Le pasamos la función a Servicios 👇 */}
          <Route path="/servicios" element={<Servicios onBookingClick={abrirModalReserva} />} />
          
          <Route path="/maestros" element={<Maestros />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      <Reservas 
        modalAbierto={modalAbierto} 
        setModalAbierto={setModalAbierto} 
        sucursalPrevia={sucursalPrevia} 
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}