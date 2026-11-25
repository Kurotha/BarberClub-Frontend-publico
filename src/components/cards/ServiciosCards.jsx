import "../../style/Servicios.css";
import "../reservas/Reservas.jsx"


function ServiceCard({ servicio, onBooking }) {
    const logo = "/barberclub_logo2.png";
    return (
        <div className="bc-services__card">

            <div className="bc-services__image-wrapper">
                <img
                    src={servicio.imagen || logo}
                    alt={servicio.nombre}
                    className="bc-services__image"
                    onError={(e) => {
                        e.target.src = logo;
                    }}
                />

                <span className="bc-services__badge">
                    {servicio.categoria}
                </span>

                <span className="bc-services__time">
                    {servicio.duracion_minutos} min
                </span>
            </div>

            <div className="bc-services__content">

                <h3 className="bc-services__card-title">
                    {servicio.nombre}
                </h3>

                <p className="bc-services__description">
                    {servicio.descripcion}
                </p>

                <div className="bc-services__footer">

                    <div>
                        <div className="bc-services__investment-label">
                            INVERSIÓN
                        </div>

                        <div className="bc-services__price">
                            $
                            {servicio.precio.toLocaleString("es-CL")}
                        </div>
                    </div>

                    <button
                        className="app-button app-button--primary"
                        onClick={() => onBooking('', servicio.id)}
                    >
                        RESERVAR
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ServiceCard;