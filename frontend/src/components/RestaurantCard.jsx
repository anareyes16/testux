import { useState } from 'react';
import axios from "../api/axiosInstance";

const RestaurantCard = ({ restaurant }) => {
    const [showAvailability, setShowAvailability] = useState(false);
    const [availability, setAvailability] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [reservationStatus, setReservationStatus] = useState(null);
    const [error, setError] = useState('');

    const fetchAvailability = async () => {
        try {
            const response = await axios.get(`/restaurants/availability`);
            const filteredAvailability = response.data.filter(
                (item) => item.restaurant_id === restaurant.id
            );
            setAvailability(filteredAvailability);
        } catch (error) {
            console.error('Error fetching availability:', error);
            setError('No se pudo obtener la disponibilidad de este restaurante.');
        }
    };

    const handleCheckAvailability = () => {
        const newShowAvailability = !showAvailability;
        setShowAvailability(newShowAvailability);

        if (newShowAvailability) {
            fetchAvailability();
        } else {
            setAvailability([]);
            setSelectedTime('');
        }
    };
    
    const handleReserve = async () => {
        if (!customerName || !selectedTime) {
            setError('Por favor, selecciona un horario y escribe tu nombre.');
            return;
        }

        try {
            const response = await axios.put('/restaurants/reserve', {
                personName: customerName,
                scheduleTime: selectedTime,
                restaurantId: restaurant.id
            });
            setReservationStatus(response.data.message);
            setError(null);
        } catch (error) {
            console.error('Error reserving restaurant:', error);
            setReservationStatus(error.response?.data?.error || 'Error al realizar la reserva.');
        }
    };

    return (
        <div className="restaurant-card">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
            <button onClick={handleCheckAvailability}>
                {showAvailability ? 'Ocultar Disponibilidad' : 'Ver Disponibilidad'}
            </button>

            {showAvailability && (
                <div className="availability-section">
                    <h4>Horarios Disponibles</h4>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    {availability.length > 0 ? (
                        <ul>
                            {availability.map((item) => (
                                <li key={item.id}>
                                    <label>
                                        <input
                                            type="radio"
                                            value={item.schedule_time}
                                            checked={selectedTime === item.schedule_time}
                                            onChange={() => setSelectedTime(item.schedule_time)}
                                        />
                                        {new Date(item.schedule_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay horarios disponibles.</p>
                    )}
                    <input
                        type="text"
                        placeholder="Tu Nombre"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <button onClick={handleReserve}>Reservar</button>
                </div>
            )}
            
            {reservationStatus && <p>{reservationStatus}</p>}
        </div>
    );
};

export default RestaurantCard;