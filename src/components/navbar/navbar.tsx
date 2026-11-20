import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface NavbarProps {
  logoSrc?: string;
  brandName?: string;
  brandSubtitle?: string;
  onBookingClick?: () => void;
  onAccountClick?: () => void;
  currentPath?: string;
}

export function Navbar({
  logoSrc = '/barberclub_logo2.png',
  brandName = 'BARBER CLUB & BEAUTY',
  brandSubtitle = 'BARBERÍA & PELUQUERÍA UNISEX',
  onBookingClick,
  onAccountClick,
  currentPath = '/',
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Maestros', href: '/maestros' },
    { label: 'Locales', href: '/locales' },
  ];

  return (
    <header className="bc-navbar">
      <div className="bc-navbar__container">
        
        {/* Logo & Marca */}
        <Link to="/" className="bc-navbar__brand">
          <div className="bc-navbar__logo-wrapper">
            <img
              src={logoSrc}
              alt={brandName}
              className="bc-navbar__logo"
            />
          </div>
          <div className="bc-navbar__brand-text">
            <span className="bc-navbar__title">{brandName}</span>
            <span className="bc-navbar__subtitle">{brandSubtitle}</span>
          </div>
        </Link>

        {/* Navegación Desktop */}
        <nav className="bc-navbar__nav" aria-label="Navegación principal">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`bc-navbar__link ${isActive ? 'bc-navbar__link--active' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Acciones: CTA Reservar Cita + Mi Cuenta */}
                <div className="bc-navbar__actions">
          <button
            type="button"
            onClick={onBookingClick}
            className="app-button app-button--primary bc-navbar__cta"
          >
            Reservar Cita
          </button>

          <button
            type="button"
            aria-label="Mi Cuenta de Usuario"
            title="Mi Cuenta"
            onClick={onAccountClick}
            className="bc-navbar__account-btn"
          >
            <svg
              className="bc-navbar__icon"
              viewBox="0 0 24 24"
              xmlns="http://w3.org"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="bc-navbar__mobile-btn"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>


      </div>

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="bc-navbar__mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="bc-navbar__mobile-link"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
