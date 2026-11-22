import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 🚨 FIX PARA QUE EL PIN DEL MAPA NO SE VEA ROTO EN VITE 🚨
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;
// 🚨 FIN DEL FIX 🚨

export default function MapaSucursal({ coordenadas, nombre }) {
  if (!coordenadas) return <div style={{ color: '#fff', padding: '20px' }}>Cargando mapa...</div>;

  return (
    <div style={{ height: '100%', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
      <MapContainer 
        center={coordenadas} 
        zoom={15} 
        style={{ height: '100%', width: '100%', minHeight: '450px' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordenadas}>
          <Popup>
            <strong>{nombre}</strong> <br /> ¡Te esperamos!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}