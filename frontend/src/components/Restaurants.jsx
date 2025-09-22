import { useState, useEffect } from 'react';
import axios from "../api/axiosInstance";
import RestaurantCard from "./RestaurantCard";

/*
cree un componente <Restaurants/> que hace una peicion al endpoint "/restaurants" y muestre la lista de restaurantes disponibles para hacer una peticion use la funcion .map()
*/

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('/restaurants');
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div>
            <h2>Restaurantes Disponibles</h2>
            <div className="restaurant-list">
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default Restaurants;