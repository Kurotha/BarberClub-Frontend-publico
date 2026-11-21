import { useState } from 'react';
import Navbar from './components/navbar/navbar';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Maestros from './pages/Maestros';
import Reservas from './components/reservas/Reservas';

function AppLayout() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [sucursalPrevia, setSucursalPrevia] = useState(''); // 👈 NUEVO ESTADO

  // Función que abre el modal y guarda la sucursal
  const abrirModalReserva = (sucursalId = '') => {
    setSucursalPrevia(sucursalId); 
    setModalAbierto(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* El Navbar abre el modal sin sucursal previa (vacío) */}
      <Navbar onBookingClick={() => abrirModalReserva('')} />
      
      <main style={{ flex: 1 }}>
        <Routes>
          {/* El Inicio le pasa el ID de la sucursal clickeada */}
          <Route path="/" element={<Inicio onBookingClick={abrirModalReserva} />} />
          
          <Route path="/maestros" element={<Maestros />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Le pasamos la sucursalPrevia al modal */}
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