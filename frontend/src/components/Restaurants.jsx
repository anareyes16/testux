import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "../api/axiosInstance";
import RestaurantCard from "./RestaurantCard";
import { setRestaurants } from '../features/restaurants/restaurantsSlice';
import { Container, Row, Col } from 'react-bootstrap';

const Restaurants = () => {
    const dispatch = useDispatch();
    const restaurants = useSelector((state) => state.restaurants);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('/restaurants');
                dispatch(setRestaurants(response.data));
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, [dispatch]);

    return (
         <Container className="d-flex flex-column align-items-center justify-content-center text-center py-4">
            <div className="my-4">
                <h1>Bienvenido a mie xamen </h1>
                <p className="lead">Descubre los mejores restaurantes cerca de ti</p>
            </div>
            <h2 className="my-4">Restaurantes Disponibles</h2>
            <Row className="justify-content-center w-100">
                {restaurants.map((restaurant) => (
                    <Col key={restaurant.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                        
                        
                        <RestaurantCard restaurant={restaurant} />
                       
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Restaurants;
