import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';
import config from './config';
import AddService from './AddService'
function Admin() {

   const [tiffins, setTiffins] = useState([]);
   
   useEffect(() => {
      const token = sessionStorage.getItem('jwt')
      // Fetch tiffin list from the backend
      axios.get(`${config.apiUrl}/admin`,{headers:{'Authorization':`Bearer ${token}`}})
         .then(response => {
            setTiffins(response.data);
         })
         .catch(error => {
            console.error("There was an error fetching the tiffins!", error);
         });
   }, []);
   const token = sessionStorage.getItem('jwt')
   const handleDelete=()=>{
      axios.delete(`${config.apiUrl}/admin`,{headers:{'Authorization':`Bearer ${token}`}})
         .then(response=>{
            setTiffins(response.data);
         })
         .catch(error => {
            console.error("There was an error deleting the tiffinservice!", error);
         });
         
   }
   return (
      <div className="myAdmin">
         <div className="myAdminInner">

            <div className="navTabs">

               <ul className="nav nav-pills nav-justified">
                  <li className="nav-item">
                     <a className="nav-link active" data-bs-toggle="pill" href="#my-admin">

                        <p className="mb-0">My Admin</p>
                     </a>
                  </li>

                  <li className="nav-item">
                     <a className="nav-link" data-bs-toggle="pill" href="#add-service">

                        <p className="mb-0">Add Service</p>
                     </a>
                  </li>

                  <li className="nav-item">
                     <a className="nav-link" data-bs-toggle="pill" href="#my-stats">

                        <p className="mb-0">Stats</p>
                     </a>
                  </li>

               </ul>
            </div>
            <div className="tabContent">
               <div className="tab-content">
                  <div className="tab-pane active" id="my-admin">
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

                  <div className="tab-pane fade" id="add-service">
                     <AddService/>
                  </div>

                  <div className="tab-pane fade" id="my-stats">
                     <div className="myOrderContent">
                        <div className="myOrderHistoryhead">
                           <div className="orderHistoryHeading">
                              <h4>Stats</h4>
                           </div>
                           <div className="adminDetailsRow row">

                              <div className=" col-md-4 p-5">
                                 <div className="adminDetails p-3">

                                    <h2>100</h2>
                                    <hr />
                                    <h5>Orders</h5>
                                 </div>
                              </div>
                              <div className=" col-md-4 p-5">
                                 <div className="adminDetails p-3">

                                    <h2>5000</h2>
                                    <hr />
                                    <h5>Revenue</h5>
                                 </div>
                              </div>
                              <div className=" col-md-4 p-5">
                                 <div className="adminDetails p-3">

                                    <h2>200</h2>
                                    <hr />
                                    <h5>Users</h5>
                                 </div>
                              </div>

                           </div>
                           <div>
                              <table className="table table-bordered text-center">
                                 <thead>

                                    <tr>
                                       <th className="p-3">
                                          Tiffin Service Name
                                       </th>
                                       <th>
                                          image path
                                       </th>
                                       <th>
                                          Phone No.
                                       </th>
                                       <th>
                                          Address
                                       </th>
                                       {/* <th>
                                       Rating
                                        </th>
                                          <th>
                                              Revenue
                                          </th> */}
                                       <th>
                                          Delete
                                       </th>
                                       <th>
                                          Stats
                                       </th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {tiffins.map((tiffin, index) => (
                                       <tr key={index}>
                                          <td className="p-3">{tiffin.serviceName}</td>
                                          <td>{tiffin.serviceImagePath}</td>
                                          <td>{tiffin.servicePhoneNo}</td>
                                          <td>{tiffin.serviceAddress}</td>

                                          <td>
                                             <button onClick={handleDelete} className="btn btn-danger deleteButton" value={tiffin.serviceId}>Delete</button>
                                          </td>
                                          <td>
                                             <a className="btn btn-primary statsButton" href='/admin-stats'>Stats</a>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>

                              </table>
                           </div>

                        </div>

                     </div>
                  </div>

               </div>
            </div>
         </div >
      </div >
   );
}

export default Admin;