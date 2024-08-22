import { useState } from 'react';
import './AddService.css';
import axios from 'axios';
import config from './config';

function AddService() {
    const [formData, setFormData] = useState({
        serviceName: '',
        serviceEmail: '',
        servicePassword: '',
        servicePhoneNo: '',
        serviceAddress: '',
        serviceDescription: '',
        isDeleted: 0,
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const token = sessionStorage.getItem('jwt');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post(`${config.apiUrl}/admin/tiffinservice`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            setSuccess('Service added successfully!');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError('Email already in use.');
            } else {
                setError('Failed to add service. Please try again.');
            }
        }
    };

    return (
        <>
            <div className="myOrderContent">
                <div className="myOrderHistoryhead">
                    <div className="orderHistoryHeading">
                        <h4>Add Service</h4>
                    </div>
                    <div className="myAdminContent">
                        <div className="row">
                            <div className="">
                                <div className="myAdminBx lbPersonalInformation">
                                    <div className="adminHeading">
                                        <h4>Service Information</h4>
                                    </div>
                                    <div className="personalContent">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label htmlFor="serviceName" className="form-label">Service Name</label>
                                                    <div className="formGroup">
                                                        <div className="input-group">
                                                            <input 
                                                                type="text" 
                                                                onChange={handleChange} 
                                                                name='serviceName' 
                                                                className="form-control" 
                                                                id="serviceName" 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="servicePhoneNo" className="form-label">Phone Number</label>
                                                    <div className="formGroup">
                                                        <div className="input-group">
                                                            <input 
                                                                type="number" 
                                                                onChange={handleChange} 
                                                                name='servicePhoneNo' 
                                                                className="form-control" 
                                                                id="servicePhoneNo" 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="serviceAddress" className="form-label">Address</label>
                                                    <div className="formGroup">
                                                        <div className="input-group">
                                                            <input 
                                                                type="text" 
                                                                onChange={handleChange} 
                                                                name='serviceAddress' 
                                                                className="form-control" 
                                                                id="serviceAddress" 
                                                                placeholder="Hinjewadi phase 2, Pune 411057, Maharashtra, India" 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="serviceDescription" className="form-label">Description</label>
                                                    <div className="formGroup">
                                                        <div className="input-group">
                                                            <input 
                                                                type="text" 
                                                                onChange={handleChange} 
                                                                name='serviceDescription' 
                                                                className="form-control" 
                                                                id="serviceDescription" 
                                                                placeholder="We serve both veg as well as Non-veg food" 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="adminHeading">
                                                    <h4>Manager Information</h4>
                                                </div>
                                                <div className="col-md-12">
                                                    <label htmlFor="serviceEmail" className="form-label">Email</label>
                                                    <div className="formGroup">
                                                        <div className="input-group">
                                                            <input 
                                                                type="email" 
                                                                onChange={handleChange} 
                                                                name='serviceEmail' 
                                                                className="form-control" 
                                                                id="serviceEmail" 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <label htmlFor="servicePassword" className="form-label">Password</label>
                                                    <div className="formGroup">
                                                        <div className="input-group">
                                                            <input 
                                                                type="password" 
                                                                onChange={handleChange} 
                                                                name='servicePassword' 
                                                                className="form-control" 
                                                                id="servicePassword" 
                                                            />
                                                            <span className="input-group-text passwordShow">
                                                                <i className="fa-regular fa-eye field-icon togglePassword"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <button type='submit' className="btn btn-warning">Save Changes</button>
                                                </div>
                                            </div>
                                        </form>
                                        {error && <p className="text-danger">{error}</p>}
                                        {success && <p className="text-success">{success}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddService;
