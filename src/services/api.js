// src/services/api.js

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Función genérica para peticiones
const request = async (endpoint, options = {}) => {
  // 1. Preparamos los headers (incluyendo el token si existe)
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }), // Si hay token, lo enviamos
    ...options.headers,
  };

  // 2. Hacemos la petición con fetch
  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    // 3. Si la respuesta no es OK (ej. 404, 500), lanzamos un error
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Error en la petición');
    }

    // 4. Si todo está bien, devolvemos el JSON
    return await response.json();
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error.message);
    throw error;
  }
};

// Exportamos métodos específicos para cada cosa
export const api = {
  // Autenticación
  login: (credentials) => request('/login/', { method: 'POST', body: JSON.stringify(credentials) }),
  registro: (userData) => request('/registro/', { method: 'POST', body: JSON.stringify(userData) }),
  
  // Reservas y Datos
  getSucursales: () => request('/sucursales/'),
  getEspecialistas: () => request('/especialistas/'),
  getServicios: () => request('/servicios/'),
  crearCita: (citaData) => request('/citas/', { method: 'POST', body: JSON.stringify(citaData) }),
};