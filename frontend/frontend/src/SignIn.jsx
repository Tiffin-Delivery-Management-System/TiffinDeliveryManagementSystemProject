import React, { useState } from 'react';
import axios from 'axios';

import "./SignIn.css";
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use the apiUrl from config
            const response = await axios.post("http://localhost:8080/login/signin", {
                email,
                password
            });

            // Assuming the token is in response.data.token


            sessionStorage.setItem('jwt', response.data.jwt);
            sessionStorage.setItem('id', response.data.id);
            sessionStorage.setItem('role', response.data.mesg);
            if (response.data.mesg === "USER") {
                navigate('/home');
            } else {
                navigate('/admin');
            }
            // Redirect after successful login
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container">
            <div className="signinsection row d-flex">
                <div className="col-10 signinleft justify-content-center">
                    <div className="signinLogo">
                        <a href="home1.html">
                            <img src="images/footer-logo.png" alt="footer-logo" className="img-fluid" />
                        </a>
                    </div>
                    <div className="loginSignupHeading">
                        <h2>Sign In</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="loginGroup">
                            <label htmlFor="emailAddress" className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="emailAddress"
                                placeholder="Email Address"
                                name="emailAddress"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="loginGroup">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="passwordField"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className="inputGroupText passwordShow">
                                    <i className="fa-regular fa-eye field-icon togglePassword" toggle="#passwordField"></i>
                                </span>
                            </div>
                            <div className="formRememberGroup">
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                                    </label>
                                </div>
                                <div className="forgotPasswordLink">
                                    <a href="javascript:void(0);" className="forgotPassword">Forgot Password</a>
                                </div>
                            </div>
                        </div>
                        {error && <div className="error">{error}</div>}
                        <button type="submit" className="btn loginSignupBtn btn-success">Sign In</button>
                    </form>
                    <p>Don't have an account? <Link to="/signup">SignUp</Link></p>
                </div>
                <div className="col-2 signinright">
                    <center>
                        <div className="loginTab">
                            <Link to="/signup">
                                <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62" fill="none">
                                    <path
                                        d="M8.28655 50.4999C12.1437 41.7142 20.7151 35.4999 31.0008 35.4999C41.2866 35.4999 50.0723 41.7142 53.7151 50.4999M61 31C61 47.5685 47.5685 61 31 61C14.4315 61 1 47.5685 1 31C1 14.4315 14.4315 1 31 1C47.5685 1 61 14.4315 61 31ZM41.7143 24.5714C41.7143 30.4888 36.9173 35.2857 31 35.2857C25.0827 35.2857 20.2857 30.4888 20.2857 24.5714C20.2857 18.6541 25.0827 13.8571 31 13.8571C36.9173 13.8571 41.7143 18.6541 41.7143 24.5714Z"
                                        stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                                <div>Sign Up</div>
                            </Link>
                        </div>
                    </center>
                </div>
            </div>
        </div>
    );
}

export default SignIn;