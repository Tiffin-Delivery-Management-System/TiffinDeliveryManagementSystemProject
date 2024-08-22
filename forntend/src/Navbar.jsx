import React, { useEffect, useState } from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import axios from "axios";
import config from "./config";

function Navbar({ isLoggedIn }) {
  const jwt = sessionStorage.getItem('jwt');
  const base64Img = sessionStorage.getItem('img');
  const role = sessionStorage.getItem('role');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (jwt) {
      // const token = sessionStorage.getItem('jwt');
      const userid = sessionStorage.getItem('id');
      const url = `${config.apiUrl}/home/user/${userid}`;
      axios.get(url, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })
        .then(response => {
          setName(response.data.name);
          setEmail(response.data.email);
        })
        .catch(error => {
          console.error('There was an error fetching the user data!', error);
        });
    }

    setCartQuantity(sessionStorage.getItem('cartQuantity'));
    // console
  });



  return (
    <nav className="navbar navbar-light navbar-expand-lg bg-light fixed-top navbarsection">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img height="81px" src="./images/logo-tiffin-paajji.png" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <a className="navbar-brand" href="/">
              <img height="81px" src="./images/tiffin.png" />
            </a>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body offcan">
            {/* <form className="d-flex search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn bg-warning" type="submit">
                <img src="./images/icon/search.png" alt="" />
              </button>
            </form> */}
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {
                jwt != null && role != "ADMIN" ? (
                  <li className="nav-item dropdown mt-5 mt-lg-0 d-lg-block user-dropdown mx-3">
                    <a className="nav-link" id="UserDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                      <img className="img-xs rounded-circle border border-warning" height={50} src={`data:image/jpeg;base64,${base64Img}`} alt="Profile image" /> </a>
                    <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
                      <div className="dropdown-header text-center">
                        <img className="img-md rounded-circle border border-warning" width={40} src={`data:image/jpeg;base64,${base64Img}`} alt="Profile image" />
                        <p className="mb-1 mt-3 fw-semibold">{name}</p>
                        <p className="fw-light text-muted mb-0">{email}</p>
                      </div>
                      <a className="dropdown-item" href="/profile"><i className="dropdown-item-icon mdi mdi-account-outline text-primary me-2"></i> My Profile <span className="badge badge-pill badge-danger">1</span></a>
                      <a className="dropdown-item" onClick={() => {
                        // sessionStorage.removeItem('jwt');
                        sessionStorage.clear();
                      }} href="/"><i className="dropdown-item-icon mdi mdi-power text-primary me-2"></i>Sign Out</a>
                    </div>
                  </li>) :
                  role == "ADMIN" ? (
                    <li className="nav-item mx-3">
                      <a className="nav-link" onClick={() => {
                        // sessionStorage.removeItem('jwt');
                        sessionStorage.clear();
                      }} href="/"><i className="dropdown-item-icon mdi mdi-power text-primary me-2"></i>Sign Out</a>
                    </li>)
                    : <></>}
              <li className="nav-item mx-3">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="#">
                  About us
                </a>
              </li>
              {
              }
              {
                jwt != null && role != "ADMIN"? (
                  <li className="nav-item">
                    <a className="nav-link cartIcon text-center btn position-relative" href="/checkout">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-1.68 9.74a2 2 0 01-1.98 1.76H7.66a2 2 0 01-1.98-1.76L4 3m4 14a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
                      </svg>

                      <span class="position-absolute bottom-75 mt-1 start-75 translate-middle badge rounded-pill bg-dark text-warning">
                        {cartQuantity == null ? 0 : cartQuantity}
                        <span class="visually-hidden">unread messages</span>
                      </span>
                    </a>
                  </li>
                ) : role == "ADMIN"?<></>: (<>
                  <li className="nav-item mx-3">
                    <a className="nav-link" href="/signin">
                      sign in
                    </a>
                  </li>
                  <li className="nav-item mx-3">
                    <a className="nav-link" href="/signup">
                      sign up
                    </a>
                  </li>
                </>
                )
              }

            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
