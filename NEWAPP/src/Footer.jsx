import './Footer.css';

function Footer() {

    return (
        <>
            <footer className="footer p-3 pb-0 bg-opacity-50 mt-3">
                <div className="footImgDiv d-flex justify-content-center align-items-center">
                    <p className="display-5">Tiffin</p>
                    <img className="footImg" src="./images/tiffin.png" alt="Not found" />
                    <p className="display-5">Paajji</p>
                </div>
                <div className="row footerContent justify-content-center">
                    <ul className="nav col-md-4 d-flex justify-content-around">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Gallery</a>
                        </li>
                        
                    </ul>
                </div>
                <div className='text-center py-3 '><p>&#169; All Copy Rights are reserved with the Tiffin Paajji</p></div>
            </footer>
        </>
    );
}

export default Footer;