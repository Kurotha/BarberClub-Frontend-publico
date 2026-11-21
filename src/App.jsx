import { useState } from 'react';
import Navbar from './components/navbar/navbar';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Maestros from './pages/Maestros';
import Servicios from './pages/Servicios';
import Reservas from './components/reservas/Reservas';
import Login from './components/login/Login'; // 👈 NUEVO IMPORT

function AppLayout() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [sucursalPrevia, setSucursalPrevia] = useState('');
  const [loginAbierto, setLoginAbierto] = useState(false); // 👈 NUEVO ESTADO PARA LOGIN

  const abrirModalReserva = (sucursalId = '') => {
    setSucursalPrevia(sucursalId); 
    setModalAbierto(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* 👇 Le pasamos la función para abrir el login 👇 */}
      <Navbar 
        onBookingClick={() => abrirModalReserva('')} 
        onAccountClick={() => setLoginAbierto(true)} 
      />
      
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Inicio onBookingClick={abrirModalReserva} />} />
          <Route path="/servicios" element={<Servicios onBookingClick={abrirModalReserva} />} />
          <Route path="/maestros" element={<Maestros onBookingClick={abrirModalReserva} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Modal de Reservas */}
      <Reservas 
        modalAbierto={modalAbierto} 
        setModalAbierto={setModalAbierto} 
        sucursalPrevia={sucursalPrevia} 
      />

      {/* 👇 Modal de Login 👇 */}
      <Login 
        modalAbierto={loginAbierto} 
        setModalAbierto={setLoginAbierto} 
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