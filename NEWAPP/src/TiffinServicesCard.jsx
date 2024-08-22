import { Link } from 'react-router-dom';
import './TiffinServicesCard.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import config from './config';

function TiffinServicesCard() {
    const [tiffinServices, setTiffinServices] = useState([]);
    const [error, setError] = useState(null);

    const token = sessionStorage.getItem('jwt');

    useEffect(() => {
        const fetchTiffinServices = async () => {
            try {
                const response = await axios.get(`${config.apiUrl}/home`);
                setTiffinServices(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
                setError('There was an error fetching the data.');
            }
        };

        fetchTiffinServices();
    }, [token]);

    const handleImageChange = (index) => {
        return `/images/Tiffins/gallery${(index % 5) + 1}.png`; // Example logic
    };


    return (
        <section className='container mb-5'>
            {error && <p className="text-danger">{error}</p>}
            <div className='row'>
                {tiffinServices.length > 0 ? (
                    tiffinServices.map((m, index) => (
                        <div className='col-md-4 px-4' key={m.serviceId}>
                            {token !=null ?
                            (<Link 
                                to={`/tiffins/${m.serviceId}`} 
                                state={{ serviceName: m.serviceName, address: m.serviceAddress }} 
                                className="serviceCard text-dark p-3 text-decoration-none"
                            >
                                <div className="card mx-4">
                                    {m.responseImage ? (
                                        <img src={m.responseImage} className="card-img-top" alt="Service" />
                                    ) : (
                                        <img src={handleImageChange(index)} className="card-img-top " alt="Default" />
                                    )}
                                    <div className="card-body text-start">
                                        <h5 className="card-title">{m.serviceName}</h5>
                                        <p className="card-text">{m.serviceAddress || 'address not available.'}</p>
                                    </div>
                                </div>
                            </Link>):(
                                <Link 
                                to={`/signin`} 
                                state={{ serviceName: m.serviceName, address: m.serviceAddress }} 
                                className="serviceCard text-dark p-3 text-decoration-none"
                            >
                                <div className="card mx-4">
                                    {m.responseImage ? (
                                        <img src={m.responseImage} className="card-img-top" alt="Service" />
                                    ) : (
                                        <img src={handleImageChange(index)} className="card-img-top " alt="Default" />
                                    )}
                                    <div className="card-body text-start">
                                        <h5 className="card-title">{m.serviceName}</h5>
                                        <p className="card-text">{m.serviceAddress || 'address not available.'}</p>
                                    </div>
                                </div>
                            </Link>
                            )    
                        }
                            {/* <Link 
                                to={`/tiffins/${m.serviceId}`} 
                                state={{ serviceName: m.serviceName, address: m.serviceAddress }} 
                                className="serviceCard text-dark p-3 text-decoration-none"
                            >
                                <div className="card mx-4">
                                    {m.img ? (
                                        <img src={m.img} className="card-img-top" alt="Service" />
                                    ) : (
                                        <img src={handleImageChange(index)} className="card-img-top " alt="Default" />
                                    )}
                                    <div className="card-body text-start">
                                        <h5 className="card-title">{m.serviceName}</h5>
                                        <p className="card-text">{m.serviceAddress || 'address not available.'}</p>
                                    </div>
                                </div>
                            </Link> */}
                        </div>
                    ))
                ) : (
                    <p>No services available.</p>
                )}
            </div>
        </section>
    );
}

export default TiffinServicesCard;
