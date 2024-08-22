import './Delivery.css'

function Delivery(){
    return(
        <div className="myAdmin">
         <div className="myAdminInner">

            <div className="navTabs">

               <ul className="nav nav-pills nav-justified">
                  <li className="nav-item">
                     <a className="nav-link active" data-bs-toggle="pill" href="#my-orders">

                        <p className="mb-0">My Orders</p>
                     </a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link " data-bs-toggle="pill" href="#my-profile">

                        <p className="mb-0">My Profile</p>
                     </a>
                  </li>



               </ul>
            </div>
            <div className="tabContent">
               <div className="tab-content">
                  <div className="tab-pane " id="my-profile">
                     <div className="myAdminContent">
                        <div className="row">
                           <div className="">
                              <div className="myAdminBx lbPersonalInformation">
                                 <div className="adminHeading">
                                    <h4>Personal Information</h4>
                                 </div>
                                 <div className="personalContent">
                                    <form action="">

                                       <div className="row">
                                          
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

                                          <div className="col-md-12">
                                             <button type='submit' className="btn btn-warning" >Save Changes</button>
                                          </div>
                                       </div>

                                    </form>
                                 </div>

                              </div>
                              <br />
                              <div className="myAdminBx lbPersonalInformation">
                                 <div className="adminHeading">
                                    <h4>Change Password</h4>
                                 </div>
                                 <div className="personalContent">

                                    <div className="row">
                                       <div className="col-md-6">
                                          <div className="formGroup">
                                             <div className="input-group">
                                                <input type="password" className="form-control"
                                                   placeholder="Current  Password" name="currentPassword" />
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-md-6"></div>
                                       <div className="col-md-6">
                                          <div className="formGroup">
                                             <div className="input-group">
                                                <input type="password" className="form-control" id="newPasswordField"
                                                   placeholder="New Password" name="newPassword" />
                                                <span className="input-group-text passwordShow">
                                                   <i className="fa-regular fa-eye field-icon togglePassword"
                                                      toggle="#newPasswordField"></i>
                                                </span>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-md-6"></div>
                                       <div className="col-md-6">
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
                              <div className="row">
                                 <div className="col-md-6">


                                 </div>
                                 <div className=" col-md-6 ">


                                 </div>

                              </div>

                           </div>

                        </div>
                     </div>
                  </div>

                  <div className="tab-pane active" id="my-orders">
                  <div>
                                    <table className="text-center table table-bordered ">
                                        <thead>

                                        <tr>
                                            <th className="py-3">
                                                Order No.
                                            </th>
                                            <th>
                                                Items
                                            </th>
                                            <th>
                                                Amount
                                            </th>
                                            <th>
                                                Status
                                            </th>

                                        </tr>
                                        </thead>
                                        <tbody>

                                        <tr>
                                            <td>
                                                Order No.
                                            </td>
                                            <td className="py-4">
                                                <table className="statTable table table-borderless ">
                                                    <tr>
                                                        <td>
                                                            Tiffin1
                                                        </td>

                                                        <td>
                                                            Quantity1
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Tiffin1
                                                        </td>
                                                        <td>
                                                            Quantity1
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Tiffin1
                                                        </td>
                                                        <td>
                                                            Quantity1
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td>
                                            Amount1
                                            </td>
                                            <td>
                                                <button  className="btn btn-success statusbtn">Delivered</button>
                                            </td>

                                        </tr>
                                        </tbody>

                                    </table>
                                </div>
                  </div>

                  <div className="tab-pane fade" id="my-orders">
                     <div className="myOrderContent">
                        <div className="myOrderHistoryhead">
                           <div className="orderHistoryHeading">
                              <h4>Orders</h4>
                           </div>
                           <div>
                                    <table className="text-center table table-bordered ">
                                        <thead>

                                        <tr>
                                            <th className="py-3">
                                                Order No.
                                            </th>
                                            <th>
                                                Items
                                            </th>
                                            <th>
                                                Amount
                                            </th>
                                            <th>
                                                Status
                                            </th>

                                        </tr>
                                        </thead>
                                        <tbody>

                                        <tr>
                                            <td>
                                                Order No.
                                            </td>
                                            <td className="py-4">
                                                <table className="statTable table table-borderless ">
                                                    <tr>
                                                        <td>
                                                            Tiffin1
                                                        </td>

                                                        <td>
                                                            Quantity1
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Tiffin1
                                                        </td>
                                                        <td>
                                                            Quantity1
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Tiffin1
                                                        </td>
                                                        <td>
                                                            Quantity1
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td>
                                            Amount1
                                            </td>
                                            <td>
                                                <a className="btn  statusbtn">Delivered</a>
                                            </td>

                                        </tr>
                                        </tbody>

                                    </table>
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

export default Delivery;