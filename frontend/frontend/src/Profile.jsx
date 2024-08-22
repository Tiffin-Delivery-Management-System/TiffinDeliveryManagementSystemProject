import './Profile.css';

function Profile() {

   

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
                                    <form action="">

                                       <div className="row">
                                          <div className="col-md-6">
                                             <div className="formGroup">
                                                <div className="input-group">
                                                   <input type="text" className="form-control" placeholder="Jhon"
                                                      name="name" />
                                                </div>
                                             </div>
                                          </div>
                                          <div className="col-md-6">
                                             <div className="formGroup">
                                                <div className="input-group">
                                                   <input type="text" className="form-control" placeholder="Doe"
                                                      name="surname" />
                                                </div>
                                             </div>
                                          </div>
                                          <div className="col-md-6">
                                             <div className="formGroup">
                                                <div className="input-group">
                                                   <input type="email" className="form-control"
                                                      placeholder="jhondeo@gmail.com" name="email" />
                                                </div>
                                             </div>
                                          </div>
                                          <div className="col-md-6">
                                             <div className="formGroup">
                                                <div className="input-group">
                                                   <input type="text" className="form-control" id="number"
                                                      placeholder="+1234567890" name="number" />
                                                </div>
                                             </div>
                                          </div>
                                          <div className="col-md-6">
                                             <div className="formRatioGroup">
                                                <h5>Gender:</h5>
                                                <div className="formRatioGroupInner">
                                                   <label>

                                                      <input type="radio" name="gender" checked />
                                                      <span className="img-btn">
                                                         Male</span>
                                                   </label>
                                                   <label >
                                                      <input type="radio" name="gender" />
                                                      <span className="img-btn">
                                                         Female</span>
                                                   </label>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="col-md-12">
                                             <button type='submit' className="btn btn-warning" >Save Changes</button>
                                          </div>
                                       </div>

                                    </form>
                                 </div>
                              </div>
                              <div className="row">
                                 <div className="col-md-6">

                                    <form action="">
                                       <div className="myProfileBx lbChangePassword">
                                          <div className="profileHeading">
                                             <h4>Change Password</h4>
                                          </div>
                                          <div className="personalContent">

                                             <div className="row">
                                                <div className="col-md-12">
                                                   <div className="formGroup">
                                                      <div className="input-group">
                                                         <input type="password" className="form-control"
                                                            placeholder="Current  Password" name="currentPassword" />
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="col-md-12">
                                                   <div className="formGroup">
                                                      <div className="input-group">
                                                         <input type="password" className="form-control" id="newPasswordField"
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
                                                         <input type="password" className="form-control" id="confirmPasswordField"
                                                            placeholder="Confirm New Password" name="confirmNewPassword" />
                                                         <span className="input-group-text passwordShow">
                                                            <i className="fa-regular fa-eye field-icon togglePassword"
                                                               toggle="#confirmPasswordField"></i>
                                                         </span>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="col-md-12">
                                                   <button type='submit' className="btn btn-warning" >Change Password</button>
                                                </div>
                                             </div>

                                          </div>
                                       </div>
                                    </form>
                                 </div>
                                 <div className=" col-md-6 ">

                                    <form action="">
                                       <div className="myProfileBx lbChangePassword changeAddress">
                                          <div className="profileHeading">
                                             <h4>Address</h4>
                                          </div>
                                          <div className="formGroup">
                                             <div className="addressInput">
                                                <textarea rows="7"type="text" className="textareaAddress form-control"
                                                   placeholder="Address" name="address" ></textarea>
                                             </div>

                                          </div>
                                          <button type="submit" className="uabtn btn btn-warning ">Update Address</button>
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
                              </div>

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