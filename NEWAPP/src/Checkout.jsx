import React, { useState, useEffect } from 'react';
import './Checkout.css';
import axios from 'axios';
import config from './config';
import { useNavigate } from 'react-router-dom';

// Function to process and aggregate cart items
const processCartItems = (items) => {
    const itemMap = new Map();

    items.forEach((item) => {
        if (itemMap.has(item.tiffinId)) {
            const existingItem = itemMap.get(item.tiffinId);
            existingItem.quantity += 1; // Increase quantity for duplicate items
        } else {
            itemMap.set(item.tiffinId, { ...item, quantity: 1 }); // Add new item
        }
    });

    return Array.from(itemMap.values());
};

function Checkout() {
    const [cartItems, setCartItems] = useState(JSON.parse(sessionStorage.getItem('cart')) || []);
    const [processedItems, setProcessedItems] = useState(processCartItems(cartItems));
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        setProcessedItems(processCartItems(cartItems));
    }, [cartItems]);

    // Function to calculate total price
    const getTotalPrice = () => {
        return processedItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
    };

    // Handle removing one occurrence of an item from the cart
    const handleRemoveFromCart = (tiffinId) => {
        const updatedCart = [...cartItems];
        const index = updatedCart.findIndex(item => item.tiffinId === tiffinId);

        if (index !== -1) {
            updatedCart.splice(index, 1); // Remove only one occurrence
            var c = sessionStorage.getItem('cartQuantity');
            sessionStorage.setItem('cartQuantity', c == null ? 1 : parseInt(c) - 1);
            sessionStorage.setItem('cart', JSON.stringify(updatedCart));
            setCartItems(updatedCart);
            window.location.reload();

            if (index === 0)
                sessionStorage.setItem("sid", 0);
        }
    };

    // Handle removing all instances of an item from the cart
    const handleRemoveAllInstances = (tiffinId) => {
        var remove = 0;

        cartItems.forEach((item) => {
            if(item.tiffinId == tiffinId)
                remove++;
    });
        const updatedCart = cartItems.filter((item) => item.tiffinId !== tiffinId);

        var c = sessionStorage.getItem('cartQuantity');
        sessionStorage.setItem('cartQuantity', c == null ? 1 : parseInt(c) - remove);
        
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        // Set sid to 0 if the cart is empty after removal
        if (updatedCart.length === 0) {
            sessionStorage.setItem("sid", 0);
        }   
        window.location.reload();
    };

    // Handle adding a new item of the same type (simulating repetition)
    const handleAddToCart = (tiffinId) => {
        const itemToAdd = cartItems.find(item => item.tiffinId === tiffinId);
        if (itemToAdd) {
            setCartItems([...cartItems, itemToAdd]); // Add the same item again
            var c = sessionStorage.getItem('cartQuantity');
            sessionStorage.setItem('cartQuantity', c == null ? 1 : parseInt(c) + 1);
            sessionStorage.setItem('cart', JSON.stringify([...cartItems, itemToAdd]));
            window.location.reload();
        }
    };

    const orderNow = async () => {
        const token = sessionStorage.getItem('jwt');
        const userId = sessionStorage.getItem('id');
        const cart = JSON.parse(sessionStorage.getItem('cart'));

        if (cart == null) {
            alert("Cart is empty!!!");
            return;
        }

        // Fetch user data first
        const userResponse = await axios.get(`${config.apiUrl}/home/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const user = userResponse.data;

        // Create an OrderDto object
        const order = {
            user,
            totalPrice: getTotalPrice(),
            tiffins: processCartItems(cart)
        };

        console.log(order);

        if (user == null) {
            alert("can't find user");
            return;
        }

        await axios.post(`${config.apiUrl}/home/addOrder`, order, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            navigate('/');
        }).catch(error => {
            setMessage(`Can't order now, try again later !!!`);
            console.error('There was an error checking out!', error);
        });

        var c = sessionStorage.getItem('cart');
        if (c != null) {
            sessionStorage.setItem("sid",0);
            window.location.reload();
            sessionStorage.setItem('cartQuantity', 0);
            sessionStorage.removeItem('cart');
        }

    }

    return (
        <section className="w-100 clearfix lbCheckOut" id="lbCheckOut">
            <div className="container">
                <div className="lbCheckOutInner">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="lbCheckOutHeading">
                            <h5>Your Order</h5>
                        </div>
                        <div className="lbCheckOutBox">
                            <div className="row">
                                <div className="col-md-12 col-xl-6">
                                    <table className="table ">
                                        <tbody>
                                            {processedItems.map((item) => (
                                                <tr className="col-md-12" key={item.tiffinId}>
                                                    <td className="col-md-2">
                                                        <div className="lbCheckOutImg">
                                                            <img src={`data:image/jpeg;base64,${item.responseImage}` || '/images/cart-img1.png'} alt="card-img" className="img-fluid lbCheckOutImg" />
                                                        </div>
                                                    </td>
                                                    <td className="col-md-6 p-3">
                                                        <h5>{item.name}</h5>
                                                        <p className="mb-0">{item.description || 'No description available.'}</p>
                                                    </td>
                                                    <td className="col-md-2 text-center">
                                                        <div className="lbCheckOutQuantity">
                                                            <button className='btn btn-secondary' type="button" onClick={() => handleRemoveFromCart(item.tiffinId)}>-</button>
                                                            <span className='mx-2'>{item.quantity}</span>
                                                            <button className='btn btn-secondary' type="button" onClick={() => handleAddToCart(item.tiffinId)}>+</button>
                                                        </div>
                                                    </td>
                                                    <td className="col-md-2 text-center">
                                                        <div className="lbCheckOutPrice">
                                                            <span>&#8377;{(item.price * item.quantity).toFixed(2)}</span>
                                                        </div>
                                                    </td>
                                                    <td className="col-md-2 text-center text-secondary">
                                                        <button
                                                            className="btn btn-warning text-dark btn-sm"
                                                            type="button"
                                                            onClick={() => handleRemoveAllInstances(item.tiffinId)}
                                                        >
                                                            Remove Product
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-12 col-xl-6">
                                    <div className="lbCheckOutDetail">
                                        <div className="lbProductsPriceTbl">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td>Cart Total</td>
                                                        <td><strong>&#8377;{getTotalPrice()}</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Delivery</td>
                                                        <td><strong>Free</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td><span>Total</span></td>
                                                        <td><strong>&#8377;{getTotalPrice()}</strong></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lbCheckOutFormDetail">
                            <div className="row">
                                <div className="col-md-12 col-lg-8">
                                    <div className="col-md-12 col-lg-4">
                                        <div className="lbCheckOutHeading">
                                            <h5>Payment Info.</h5>
                                        </div>
                                        <div className="lbPaymentInfo">
                                            <div className="lbCheckOutPayment mb-0">
                                                <div className="custom_radio">
                                                    <label className="form-label">Payment Method:</label>
                                                    <div className="formLabel">
                                                        <input type="radio" id="featured-1" name="payment" checked />
                                                        <label htmlFor="featured-1">
                                                            <span className="ratioIcon">
                                                                <img src="/images/icon/credit.png" alt="icon" className="img-fluid" />
                                                            </span>
                                                            Credit Card
                                                        </label>
                                                    </div>
                                                    <div className="formLabel">
                                                        <input type="radio" id="featured-2" name="payment" />
                                                        <label htmlFor="featured-2">
                                                            <span className="ratioIcon">
                                                                <img src="/images/icon/paypal.png" alt="icon" className="img-fluid" />
                                                            </span>
                                                            UPI
                                                        </label>
                                                    </div>
                                                    <div className="yourInfoBtn">
                                                        <div className="yourInfoBtnGroup">
                                                            <button onClick={orderNow} type="button" className="btn btn-warning">Pay Now</button>
                                                        </div   >
                                                        <p className='text-danger mt-2'>
                                                            {message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Checkout;
