import axios from 'axios';
import './CardsOfTiffin.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import config from './config';

function CardsOfTiffin() {
    const { serviceId } = useParams(); // Get serviceId from the URL
    const location = useLocation();
    const { serviceName } = location.state || {}; // Accessing the serviceName passed via Link
    const [tiffins, setTiffins] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem('jwt');
        const url = `${config.apiUrl}/home/tiffins/${serviceId}`;
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setTiffins(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the tiffin data!', error);
        });
    }, [serviceId]);

    const handleImageChange = (index) => {
        // Ensure the path is correct. This assumes images are in the `public/images/Tiffins/` directory.
        return `/images/Tiffins/img${(index % 4) + 1}.png`; // Example logic
    };

    return (
        <div className="cardsOfTiffin">
            <h2 className="display-3 fw-bold">{serviceName}</h2>
            <div className="ourMealPlanRow">
                <div className="ourMealPlanCol">
                    <div className="commonHeading headingLeft">
                        <h4>Our <span>Meal</span> Plan</h4>
                        <p className="mb-0">Preparations to temperature-controlled packaging and transportation of food.</p>
                    </div>
                </div>
                <div className="ourMealPlanCol">
                    <ul className="nav nav-pills ourMealNav">
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="pill" href="#veg">Veg</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="pill" href="#nonVeg">Non-veg</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="cardHolder row">
                {tiffins.map((m, index) => (
                    <div className='col-md-12 cardWrapper' key={m.tiffinId}>
                        <div className="card TiffinCard dark p-md-2">
                            <img 
                                src={m.img || handleImageChange(index)} 
                                className="card-img-top" 
                                alt={m.name || "Tiffin"} 
                            />
                            <div className="card-body">
                                <div className="text-section d-flex flex-column justify-content-around text-start">
                                    <h5 className="card-title h4 fw-bold">{m.name}</h5>
                                    <p className="card-text">{m.description || 'No description available.'}</p>
                                </div>
                                <div className="cta-section p-md-4">
                                    <h5>&#8377;{m.price}</h5>
                                    <Link to="/AddService" className="btn cartBtn btn-light">Add to Cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardsOfTiffin;
