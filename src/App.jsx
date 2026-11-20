import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/navbar/navbar';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Inicio from './pages/inicio';
import Servicios from './pages/servicios';
import Reservas from './components/reservas/Reservas';

function AppLayout() {
  const location = useLocation();

    const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <>
    <Navbar currentPath={location.pathname} onBookingClick={() => setModalAbierto(true)} />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />

        {/* Redirige cualquier ruta aún no creada al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Reservas 
        modalAbierto={modalAbierto} 
        setModalAbierto={setModalAbierto} 
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}