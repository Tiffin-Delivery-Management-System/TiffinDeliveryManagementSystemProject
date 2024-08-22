import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar() {
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
              <li className="nav-item dropdown mt-5 mt-lg-0 d-lg-block user-dropdown mx-3">
                <a className="nav-link" id="UserDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                  <img className="img-xs rounded-circle border border-warning" height={50} src="./images/cartoon_Jayant.jpg" alt="Profile image" /> </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
                  <div className="dropdown-header text-center">
                    <img className="img-md rounded-circle border border-warning" width={40} src="./images/cartoon_Jayant.jpg" alt="Profile image" />
                    <p className="mb-1 mt-3 fw-semibold">Allen Moreno</p>
                    <p className="fw-light text-muted mb-0">allenmoreno@gmail.com</p>
                  </div>
                  <a className="dropdown-item" href="/profile"><i className="dropdown-item-icon mdi mdi-account-outline text-primary me-2"></i> My Profile <span className="badge badge-pill badge-danger">1</span></a>
                  <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-power text-primary me-2"></i>Sign Out</a>
                </div>
              </li>
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
              <li className="nav-item">
                <a className="nav-link cartIcon text-center" href="/checkout">
                  <img height="30px" src="./images/icon/cart.png" alt="Not Found" />
                  <span id="nosItemCart">2</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
