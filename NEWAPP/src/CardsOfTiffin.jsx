import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './redux/cartSlice'; // Ensure this path is correct
import axios from 'axios';
import './CardsOfTiffin.css';
import { useLocation, useParams } from 'react-router-dom';
import config from './config';

function CardsOfTiffin() {
  const { serviceId } = useParams();
  const location = useLocation();
  const { serviceName } = location.state || {};
  const [tiffins, setTiffins] = useState([]);
  const dispatch = useDispatch();
  
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
  
  const handleAddToCart = (tiffin) => {
    var checkServicePresent = sessionStorage.getItem('sid');

    if(checkServicePresent == null || checkServicePresent == serviceId || checkServicePresent == 0){
      
      sessionStorage.setItem("sid",serviceId);
      const cart = JSON.parse(sessionStorage.getItem('cart')) || []; 
      // Push the tiffin as a new entry each time the button is clicked
      cart.push(tiffin);
      var c = sessionStorage.getItem('cartQuantity');
      sessionStorage.setItem('cartQuantity', c == null ? 1: parseInt(c)+1);
      sessionStorage.setItem('cart', JSON.stringify(cart));
      window.location.reload();
      dispatch(addItem(tiffin));
    }
    else
      alert("You have already added other service to your cart");
  };
  
  const handleImageChange = (index) => {
    return `/images/Tiffins/img${(index % 4) + 1}.png`; // Ensure path is correct
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
                src={`data:image/jpeg;base64,${m.responseImage}` || handleImageChange(index)} 
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
                  <button 
                    className="btn cartBtn btn-light" 
                    onClick={() => handleAddToCart(m)}
                  >
                    Add to Cart
                  </button>
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
