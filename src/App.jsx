import { useState } from 'react';
import Navbar from './components/navbar/navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Inicio from './pages/inicio';
import Servicios from './pages/servicios';
import Reservas from './components/reservas/Reservas';

function AppLayout() {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <>
      <Navbar onBookingClick={() => setModalAbierto(true)} />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
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