import { useEffect, useState } from 'react';
import './Profile.css';
import config from './config';
import axios from 'axios';

function Profile() {

   const [message, setMessage] = useState("");
   const [message2, setMessage2] = useState("");

   // const token = sessionStorage.getItem('jwt');
   /*
   *  updation of the user ----------------------------->
    */
      /*
    * Order History -----------------------> 
    */
   const [orderHistory, setOrderHistory] = useState([]);

   const [personalInfo, setPersonalInfo] = useState({
      userId: '',
      name: '',
      email: '',
      phoneNo: '',
      address: '',
   });

   useEffect(() => {
      const token = sessionStorage.getItem('jwt');
      const id = sessionStorage.getItem('id');

      // Fetch user information from the backend
      axios.get(`${config.apiUrl}/home/user/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(response => {
         const { userId, name, email, phoneNo, address } = response.data;
         setPersonalInfo({ userId, name, email, phoneNo, address });
      })
      .catch(error => {
         console.error("There was an error fetching the user info!", error);
         
      });
      
      // Fetch order from backend
         axios.get(`${config.apiUrl}/user/orders/${id}`,{
            headers: { Authorization: `Bearer ${token}` },
         }).then(response =>{
            setOrderHistory(response.data);
            console.log(response.data);
         }).catch(error =>{
            console.error(error);
         })
   }, []);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setPersonalInfo(prevState => ({
         ...prevState,
         [name]: value,
      }));
   };

   const handleSaveChanges = (e) => {
      e.preventDefault();
      const token = sessionStorage.getItem('jwt');
      // const userId = sessionStorage.getItem('id');

      axios.put(`${config.apiUrl}/user/update`, personalInfo, { headers: { 'Authorization': `Bearer ${token}` } })
         .then(response => {
            console.log("User information updated successfully 123123!");
            setMessage2("success");
         })
         .catch(error => {
            console.error("There was an error updating the user info!", error);
            setMessage2("fail");
         });
   };

   /*
   !  change password of user ------------------------->
    */


   const [passwordInfo, setPasswordInfo] = useState({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
   });
   const handlePasswordInputChange = (e) => {
      const { name, value } = e.target;
      setPasswordInfo((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };
   const handleChangePassword = (e) => {
      e.preventDefault();

      const token = sessionStorage.getItem('jwt');
      const userId = sessionStorage.getItem('id');

      if (passwordInfo.newPassword !== passwordInfo.confirmNewPassword) {
         setMessage("fail");
         console.error("Passwords do not match");
         return;
      }

      const changePasswordPayload = {
         userId: userId,
         oldPassword: passwordInfo.currentPassword,
         newPassword: passwordInfo.newPassword,
      };

      axios.put(`${config.apiUrl}/user/update-password`, changePasswordPayload, {
         headers: { Authorization: `Bearer ${token}` },
      })
         .then((response) => {
            console.log('Password updated successfully!', response.data);
            setMessage("success");
            // Optionally, clear the form fields
            setPasswordInfo({
               currentPassword: '',
               newPassword: '',
               confirmNewPassword: '',
            });
         })
         .catch((error) => {
            console.error('There was an error updating the password!', error);
            setMessage("fail2");
         });
   };


  

   return (
      <div className="container myProfile">
         <div className="myProfileInner">

            <div className="navTabs">

               <ul className="nav nav-pills nav-justified">
                  <li className="nav-item">
                     <a className="nav-link active" data-bs-toggle="pill" href="#my-profile">

                        <p className="mb-0">My Profile</p>
                     </a>
                  </li>

                  <li className="nav-item">
                     <a className="nav-link" data-bs-toggle="pill" href="#my-order">

                        <p className="mb-0">My Order</p>
                     </a>
                  </li>

               </ul>
            </div>
            <div className="tabContent">
               <div className="tab-content">
                  <div className="tab-pane active" id="my-profile">
                     <div className="myProfileContent">
                        <div className="row">
                           <div className="">
                              <div className="myProfileBx lbPersonalInformation">
                                 <div className="profileHeading">
                                    <h4>Personal Information</h4>
                                 </div>
                                 <div className="personalContent">
                                    <form action='' onSubmit={handleSaveChanges}>

                                       <div className="row">
                                          <div className="col-md-6">
                                             <div className="formGroup">
                                                <div className="input-group">
                                                   <input type="text" className="form-control"
                                                      value={personalInfo.name}
                                                      onChange={handleInputChange}
                                                      name="name" />
                                                </div>
                                             </div>
                                          </div>
                                          <div className="col-md-6">
                                             <div className="formGroup">
                                                <div className="input-group">
                                                   <input type="text" className="form-control"
                                                      value={personalInfo.email}
                                                      onChange={handleInputChange}
                                                      name="email" />
                                                </div>
                                             </div>
                                          </div>
                                          <div className="col-md-6">
                                             <div className="formGroup">
                                                <div className="input-group">
                                                   <input type="text" className="form-control" id="number"
                                                      value={personalInfo.phoneNo}
                                                      onChange={handleInputChange} name="number" />
                                                </div>
                                             </div>
                                          </div>
                                          <div className="col-md-6">
                                             <div className="formGroup">
                                                <div className="input-group">
                                                   <input type="text" className="form-control" id="address"
                                                      value={personalInfo.address}
                                                      onChange={handleInputChange} name="address" />
                                                </div>
                                             </div>
                                          </div>
                                          <div className="col-md-12">
                                             <p style={{ color: message2 === "success" ? "green" : "red" }}>
                                                {message2 === "" ? "" : message2 === "success" ? "User Updated Successfully!" : "User Not Updated!"}
                                             </p>

                                             <button type='submit' className="btn btn-warning" >Save Changes</button>
                                          </div>
                                       </div>

                                    </form>
                                 </div>
                              </div>
                              <div className="row">
                                 <div className="col-md-6">

                                    <form action="" onSubmit={handleChangePassword}>
                                       <div className="myProfileBx lbChangePassword">
                                          <div className="profileHeading">
                                             <h4>Change Password</h4>
                                          </div>
                                          <div className="personalContent">

                                             <div className="row">
                                                <div className="col-md-12">
                                                   <div className="formGroup">
                                                      <div className="input-group">
                                                         <input type="password" className="form-control" onChange={handlePasswordInputChange}
                                                            placeholder="Current  Password" name="currentPassword" />
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="col-md-12">
                                                   <div className="formGroup">
                                                      <div className="input-group">
                                                         <input type="password" className="form-control" id="newPasswordField" onChange={handlePasswordInputChange}
                                                            placeholder="New Password" name="newPassword" />
                                                         <span className="input-group-text passwordShow">
                                                            <i className="fa-regular  field-icon togglePassword"
                                                               toggle="#newPasswordField"></i>
                                                         </span>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="col-md-12">
                                                   <div className="formGroup">
                                                      <div className="input-group">
                                                         <input type="password" className="form-control" id="confirmPasswordField" onChange={handlePasswordInputChange}
                                                            placeholder="Confirm New Password" name="confirmNewPassword" />
                                                         <span className="input-group-text passwordShow">
                                                            <i className="fa-regular fa-eye field-icon togglePassword"
                                                               toggle="#confirmPasswordField"></i>
                                                         </span>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="col-md-12">
                                                   <p style={{ color: message === "success" ? "green" : "red" }}>
                                                      {message === "" ? "" : message === "success" ? "Password updated successfully" : (message == "fail" ? "New password and confirm password do not match!" : "Current Password is Wrong")}
                                                   </p>
                                                   <button type='submit' className="btn btn-warning" >Change Password</button>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </form>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="tab-pane fade" id="my-order">
                     <div className="myOrderContent">
                        <div className="myOrderHistoryhead">
                           <div className="orderHistoryHeading">
                              <h4>Order History</h4>
                           </div>

                        </div>
                        <div className="orderCardGroup">
                           <div className="row">
                           {orderHistory.map((order, index) => (
                           <div className="col-md-6" key={index}>
                              <div className="orderCard">
                                 <div className="orderCardInner">
                                    <div className="orderCardHead">
                                       <div className="orderCardHeadLeftCol">
                                          <a href="javascript:void(0);" className="shipped">
                                             <span className="tiffinService">{order.c}</span>
                                          </a>
                                       </div>
                                       <div className="orderCardHeadRightCol">
                                          <a href="javascript:void(0);" className="invoice">
                                             Invoice
                                          </a>
                                       </div>
                                    </div>
                                    <div className="orderCardBody">
                                       <div className="orderCardInnerBody">
                                          <div className="orderCardImgBody">
                                             <img src={order.imageUrl} alt="img" className="img-fluid" />
                                          </div>
                                          <div className="orderCardImgContent">
                                             <h4>{order.dishName}</h4>
                                             <p>{order.description}</p>
                                             <div className="orderCardBtn">
                                                <span className="orderPrice">${order.totalPrice}</span>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                              {/* <div className="col-md-6">
                                 <div className="orderCard">
                                    <div className="orderCardInner">
                                       <div className="orderCardHead">
                                          <div className="orderCardHeadLeftCol">
                                             <a href="javascript:void(0);" className="shipped">

                                                <span className="tiffinService">Restraurant Name</span>
                                             </a>
                                          </div>
                                          <div className="orderCardHeadRightCol">
                                             <a href="javascript:void(0);" className="invoice">
                                                Invoice
                                             </a>

                                          </div>
                                       </div>
                                       <div className="orderCardBody">
                                          <div className="orderCardInnerBody">
                                             <div className="orderCardImgBody">
                                                <img src="images/cart-img1.png" alt="img" className="img-fluid" />
                                             </div>
                                             <div className="orderCardImgContent">
                                                <h4>Special Thali</h4>
                                                <p>Paneer Chatpata / Dalfry / 5 Roti / Jeera Rice / Raita / 1 Sweet /
                                                   Salad / Papad</p>

                                                <div className="orderCardBtn">

                                                   <span className="orderPrice">$ 07</span>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="col-md-6">
                                 <div className="orderCard">
                                    <div className="orderCardInner">
                                       <div className="orderCardHead">
                                          <div className="orderCardHeadLeftCol">
                                             <a href="javascript:void(0);" className="shipped">

                                                <span className="tiffinService">Restraurant Name</span>
                                             </a>
                                          </div>
                                          <div className="orderCardHeadRightCol">
                                             <a href="javascript:void(0);" className="invoice">
                                                Invoice
                                             </a>

                                          </div>
                                       </div>
                                       <div className="orderCardBody">
                                          <div className="orderCardInnerBody">
                                             <div className="orderCardImgBody">
                                                <img src="images/cart-img1.png" alt="img" className="img-fluid" />
                                             </div>
                                             <div className="orderCardImgContent">
                                                <h4>Special Thali</h4>
                                                <p>Paneer Chatpata / Dalfry / 5 Roti / Jeera Rice / Raita / 1 Sweet /
                                                   Salad / Papad</p>

                                                <div className="orderCardBtn">

                                                   <span className="orderPrice">$ 07</span>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div> */}

                           </div>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
         </div>
      </div>
   );
}

export default Profile;