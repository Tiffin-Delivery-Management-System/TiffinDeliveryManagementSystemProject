import { Link } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";
import { useState } from "react";

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNo: '',
        address: '',
        userImage: null,
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 3 * 1024 * 1024) {  // 5MB in bytes
                setError('Image size should not exceed 3MB.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, userImage: reader.result.split(',')[1] });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('http://localhost:8080/register', formData);
            setSuccess('Registration successful!');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError('Email already in use.');
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signupsection row">
            <div className="col-10 signupleft">
                <div className="signupForm">
                    <div className="signupFormOuter">
                        <div className="signupFormInner">
                            <div className="signupSignupHeading">
                                <h2>Sign Up</h2>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="groupField">
                                    <div className="signupGroup">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Name"
                                            name="name"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="signupGroup">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        onChange={handleChange}
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Email address"
                                        name="email"
                                        required
                                    />
                                </div>
                                <div className="signupGroup">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <input
                                            onChange={handleChange}
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            name="password"
                                        />
                                        <span
                                            className="inputGroupText passwordShow"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <i
                                                className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} field-icon`}
                                            ></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="signupGroup">
                                    <label htmlFor="phoneNo" className="form-label">Phone Number</label>
                                    <input
                                        onChange={handleChange}
                                        type="tel"
                                        maxLength={10}
                                        className="form-control"
                                        id="phoneNo"
                                        placeholder="(+91) Phone Number"
                                        name="phoneNo"
                                        required
                                    />
                                </div>
                                <div className="signupGroup">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder="Address"
                                        name="address"
                                        required
                                    />
                                </div>
                                <div className="signupGroup">
                                    <label htmlFor="userImage" className="form-label">Image</label>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/gif"
                                        className="form-control"
                                        id="userImage"
                                        name="userImage"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </div>
                                <br />
                                <button type="submit" className="btn signupSignupBtn btn-success">Sign Up</button>
                            </form>
                            {success && <p style={{ color: 'green' }}>{success}</p>}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <p>Already have an account? <Link to="/signin">Sign In</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-2 signupright">
                <div className="signupTab">
                    <center>
                        <Link to="/signin">
                            <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62" fill="none">
                                <path
                                    d="M8.28655 50.4999C12.1437 41.7142 20.7151 35.4999 31.0008 35.4999C41.2866 35.4999 50.0723 41.7142 53.7151 50.4999M61 31C61 47.5685 47.5685 61 31 61C14.4315 61 1 47.5685 1 31C1 14.4315 14.4315 1 31 1C47.5685 1 61 14.4315 61 31ZM41.7143 24.5714C41.7143 30.4888 36.9173 35.2857 31 35.2857C25.0827 35.2857 20.2857 30.4888 20.2857 24.5714C20.2857 18.6541 25.0827 13.8571 31 13.8571C36.9173 13.8571 41.7143 18.6541 41.7143 24.5714Z"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div>Sign In</div>
                        </Link>
                    </center>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
