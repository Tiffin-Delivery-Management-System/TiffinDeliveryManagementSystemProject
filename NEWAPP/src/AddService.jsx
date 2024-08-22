import { useState, useEffect } from 'react';
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
        serviceImagePath: '', // Store as base64 string
        deliveryBoy: null,
        isDeleted: 0,
    });
    const [deliveryData, setDeliveryData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNo: '',
        isDeleted: 0,
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [deliveryDataUpdated, setDeliveryDataUpdated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    

    const dhandleChange = (e) => {
        const { name, value } = e.target;
        setDeliveryData({ ...deliveryData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 3 * 1024 * 1024) { // Check if file size exceeds 3MB
                setError('Image file size must be less than 3MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                // Convert image to base64 string
                setFormData({ ...formData, serviceImagePath: reader.result.split(',')[1] });
            };
            reader.readAsDataURL(file);
        }
    };

    const token = sessionStorage.getItem('jwt');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!deliveryData.name || !deliveryData.email || !deliveryData.password || !deliveryData.phoneNo) {
            setError('All delivery fields must be filled out.');
            return;
        }

        if (!formData.serviceName || !formData.serviceEmail || !formData.servicePassword || !formData.servicePhoneNo) {
            setError('All service fields must be filled out.');
            return;
        }

        try {
            // Post delivery data
            const deliveryResponse = await axios.post(`${config.apiUrl}/admin/deliveryboy`, deliveryData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("DR: ", deliveryResponse);

            // Update formData with deliveryBoy ID or relevant data
            setFormData({
                ...formData,
                deliveryBoy: deliveryResponse.data
            });

            // Set a flag to indicate that deliveryData has been updated
            setDeliveryDataUpdated(true);

        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.status === 409) {
                setError('Email already in use.');
            } else {
                setError('Failed to add service. Please try again.');
            }
        }
    };

    useEffect(() => {
        const addService = async () => {
            try {
                // Post service data only after deliveryData has been updated
                if (deliveryDataUpdated) {
                    const serviceResponse = await axios.post(`${config.apiUrl}/admin/tiffinservice`, formData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log('Service response:', serviceResponse.data);
                    setSuccess('Service added successfully!');
                }
            } catch (error) {
                console.error('Error:', error);
                if (error.response && error.response.status === 409) {
                    setError('Email already in use.');
                } else {
                    setError('Failed to add service. Please try again.');
                }
            }
        };

        addService(); // Call the function to post service data
    }, [deliveryDataUpdated]); // Dependency on deliveryDataUpdated flag

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
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
                                                            value={formData.serviceName}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="servicePhoneNo" className="form-label">Phone Number</label>
                                                <div className="formGroup">
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            onChange={handleChange}
                                                            name='servicePhoneNo'
                                                            className="form-control"
                                                            id="servicePhoneNo"
                                                            value={formData.servicePhoneNo}
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
                                                            value={formData.serviceAddress}
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
                                                            value={formData.serviceDescription}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="serviceEmail" className="form-label">Email</label>
                                                <div className="formGroup">
                                                    <div className="input-group">
                                                        <input
                                                            type="email"
                                                            onChange={handleChange}
                                                            name='serviceEmail'
                                                            className="form-control"
                                                            id="serviceEmail"
                                                            value={formData.serviceEmail}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="servicePassword" className="form-label">Password</label>
                                                <div className="formGroup">
                                                    <div className="input-group">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            onChange={handleChange}
                                                            name='servicePassword'
                                                            className="form-control"
                                                            id="servicePassword"
                                                            value={formData.servicePassword}
                                                        />
                                                        <span
                                                            className="input-group-text passwordShow"
                                                            onClick={togglePasswordVisibility}
                                                        >
                                                            <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} field-icon`}></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-6 pb-4">
                                                <label htmlFor="serviceImagePath" className="form-label">Image</label>
                                                <input
                                                    type="file"
                                                    accept="image/png, image/jpeg, image/gif"
                                                    className="form-control"
                                                    id="serviceImagePath"
                                                    name="serviceImagePath"
                                                    onChange={handleImageChange} // Updated handler
                                                    required // Ensure field is required
                                                />
                                            </div>
                                            
                                            <div className="adminHeading">
                                                <h4>Delivery Information</h4>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="name" className="form-label">Name</label>
                                                <div className="formGroup">
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            onChange={dhandleChange}
                                                            name='name'
                                                            className="form-control"
                                                            id="name"
                                                            value={deliveryData.name}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="phoneNo" className="form-label">Phone Number</label>
                                                <div className="formGroup">
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            onChange={dhandleChange}
                                                            name='phoneNo'
                                                            className="form-control"
                                                            id="phoneNo"
                                                            value={deliveryData.phoneNo}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <div className="formGroup">
                                                    <div className="input-group">
                                                        <input
                                                            type="email"
                                                            onChange={dhandleChange}
                                                            name='email'
                                                            className="form-control"
                                                            id="email"
                                                            value={deliveryData.email}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <div className="formGroup">
                                                    <div className="input-group">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            onChange={dhandleChange}
                                                            name='password'
                                                            className="form-control"
                                                            id="password"
                                                            value={deliveryData.password}
                                                        />
                                                        <span
                                                            className="input-group-text passwordShow"
                                                            onClick={togglePasswordVisibility}
                                                        >
                                                            <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} field-icon`}></i>
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
    );
}

export default AddService;