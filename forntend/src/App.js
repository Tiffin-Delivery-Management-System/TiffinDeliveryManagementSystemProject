import Navbar from './Navbar';
import Footer from './Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import SignIn from './SignIn';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Checkout from './Checkout';
import Profile from './Profile';
import TiffinServicesCard from './TiffinServicesCard';
import Admin from './Admin';
import AdminStats from './AdminStats';
import Manager from './Manager';
import Delivery from './Delivery';
import CarouselTiffin from './CarouselTiffin'
import CardsOfTiffin from './CardsOfTiffin';
import Home from './components/home/Home';
import { useState } from 'react';
import AddTiffin from './AddTiffin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  return (

    <div className="App">
      <Navbar  isLoggedIn={isLoggedIn} />
      <div className="Appinside">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home/>}/> */}
        {/* <Route path="/" */}
        <Route path="/" element={<><CarouselTiffin/><TiffinServicesCard/></>}/>
        </Routes>
        <div className="container">

      <Routes>
        
        <Route path="/tiffins/:serviceId" element={<CardsOfTiffin/>}/>
        <Route path='/admin' element={<Admin/>}/>
          <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/admin-stats" element={<AdminStats/>}/>
        <Route path="/delivery" element={<Delivery/>}/>
        <Route path="/manager" element={<Manager/>}/>
        <Route path="/addtiffin" element={<AddTiffin/>}/>
      </Routes>
        </div>
      </BrowserRouter>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
