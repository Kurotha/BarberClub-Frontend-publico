import "../../style/Maestros.css";
import "../reservas/Reservas.jsx";

function MaestrosCard({ especialista, onBooking }) {
    const logo = "/barberclub_logo2.png";

    return (
        <div className="bc-specialist-card">

            <div className="bc-specialist-card__image-wrapper">

                <img
                    src={especialista.imagen || logo}
                    alt={especialista.nombre_completo}
                    className="bc-specialist-card__image"
                    onError={(e) => {
                        e.target.src = logo;
                    }}
                />

                <div className="bc-specialist-card__location">
                    {especialista.sucursal_nombre} - {especialista.sucursal_comuna}
                </div>

                <div className="bc-specialist-card__experience">
                    {especialista.anos_experiencia} años de trayectoria
                </div>

            </div>

            <div className="bc-specialist-card__content">

                <h3 className="bc-specialist-card__name">
                    {especialista.nombre_completo}
                </h3>

                <div className="bc-specialist-card__speciality">
                    {especialista.especialidad}
                </div>

                <p className="bc-specialist-card__bio">
                    {especialista.biografia}
                </p>

                <button
                    className="bc-specialist-card__button"
                    onClick={() => onBooking(especialista.sucursal.id,'', especialista.id)}
                >
                    RESERVAR
                </button>

            </div>

        </div>
    );
}

export default MaestrosCard;