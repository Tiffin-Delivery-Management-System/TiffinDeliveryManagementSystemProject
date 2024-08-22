import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';
import config from './config';
import AddService from './AddService'

function Admin() {
  const [tiffins, setTiffins] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phoneNo: '',
  });
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [dashboardStats, setDashboardStats] = useState({
    totalRevenue: 0,
    totalUsers: 0,
    totalOrders: 0,
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
      console.error("New password and confirm password do not match!");
      setMessage2("fail");
      return;
    }
    const changePasswordPayload = {
      userId: userId,
      oldPassword: passwordInfo.currentPassword,
      newPassword: passwordInfo.newPassword,
    };

    axios.put(`${config.apiUrl}/admin/update-password`, changePasswordPayload, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log('Password updated successfully!', response.data);
        // Optionally, clear the form fields
        setMessage2("success");
        setPasswordInfo({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      })
      .catch((error) => {
        setMessage2("fail2");
        console.error('There was an error updating the password!', error);
      });
  };
  const [message2, setMessage2] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const token = sessionStorage.getItem('jwt');
    const userId = sessionStorage.getItem('id');

    // Fetch tiffin list from the backend
    axios.get(`${config.apiUrl}/admin`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(response => {
        setTiffins(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tiffins!", error);
      });

    // Fetch user information from the backend
    axios.get(`${config.apiUrl}/admin/user/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(response => {
        const { name, email, phoneNo } = response.data;
        setPersonalInfo({ name, email, phoneNo });
      })
      .catch(error => {
        console.error("There was an error fetching the user info!", error);
      });

    // Fetch dashboard statistics from the backend
    axios.get(`${config.apiUrl}/admin/dashboard-stats`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(response => {
        setDashboardStats(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the dashboard stats!", error);
      });
  }, []);

  const handleDelete = (serviceId) => {
    const token = sessionStorage.getItem('jwt');
    axios.delete(`${config.apiUrl}/admin/tiffin-service/${serviceId}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(response => {
        setTiffins(response.data);
      })
      .catch(error => {
        console.error("There was an error deleting the tiffin service!", error);
      });
  };

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
    const userId = sessionStorage.getItem('id'); // Get the userId from session storage

    const updatedUserInfo = {
      userId: userId, // Include userId in the payload
      name: personalInfo.name,
      email: personalInfo.email,
      phoneNo: personalInfo.phoneNo,
      address: personalInfo.address
    };

    axios.put(`${config.apiUrl}/admin/update`, updatedUserInfo, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(response => {
        setMessage("success");
        console.log("User information updated successfully!", response.data);
      })
      .catch(error => {
        setMessage("fail");
        console.error("There was an error updating the user info!", error);
      });


  };



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
                        <form onSubmit={handleSaveChanges}>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="formGroup">
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="John"
                                    name="name"
                                    value={personalInfo.name}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="formGroup">
                                <div className="input-group">
                                  <input
                                    type="email"
                                    className="form-control"
                                    placeholder="johndoe@gmail.com"
                                    name="email"
                                    value={personalInfo.email}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="formGroup">
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="+1234567890"
                                    name="phoneNo"
                                    value={personalInfo.phoneNo}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <p
                                style={{ color: message === "success" ? "green" : "red" }}
                              >{message === "" ? "" : (message === "success" ? "Updated data successfully !" : "failed to update Data")}</p>
                              <button type="submit" className="btn btn-warning">Save Changes</button>
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
                        <form onSubmit={handleChangePassword}>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="formGroup">
                                <div className="input-group">
                                  <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Current Password"
                                    name="currentPassword"
                                    value={passwordInfo.currentPassword}
                                    onChange={handlePasswordInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6"></div>
                            <div className="col-md-6">
                              <div className="formGroup">
                                <div className="input-group">
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="newPasswordField"
                                    placeholder="New Password"
                                    name="newPassword"
                                    value={passwordInfo.newPassword}
                                    onChange={handlePasswordInputChange}
                                  />
                                  <span className="input-group-text passwordShow">
                                    <i className="fa-regular fa-eye field-icon togglePassword"></i>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6"></div>
                            <div className="col-md-6">
                              <div className="formGroup">
                                <div className="input-group">
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPasswordField"
                                    placeholder="Confirm New Password"
                                    name="confirmNewPassword"
                                    value={passwordInfo.confirmNewPassword}
                                    onChange={handlePasswordInputChange}
                                  />
                                  <span className="input-group-text passwordShow">
                                    <i className="fa-regular fa-eye field-icon togglePassword"></i>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <p style={{ color: message2 === "success" ? "green" : "red" }}>
                                {message === "" ? "" : message2 === "success" ? "Password updated successfully" : (message2 == "fail" ? "New password and confirm password do not match!" : "Current Password is Wrong")}
                              </p>
                              <button type="submit" className="btn btn-warning">Change Password</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="add-service">
              <AddService />
            </div>

            <div className="tab-pane fade" id="my-stats">
              <div className="myOrderContent">
                <div className="myOrderHistoryhead">
                  <div className="orderHistoryHeading">
                    <h4>Stats</h4>
                  </div>
                  <div className="adminDetailsRow row">
                    <div className="col-md-4 p-5">
                      <div className="adminDetails p-3">
                        <h2>{dashboardStats.totalOrders}</h2>
                        <hr />
                        <h5>Orders</h5>
                      </div>
                    </div>
                    <div className="col-md-4 p-5">
                      <div className="adminDetails p-3">
                        <h2>{dashboardStats.totalRevenue}</h2>
                        <hr />
                        <h5>Revenue</h5>
                      </div>
                    </div>
                    <div className="col-md-4 p-5">
                      <div className="adminDetails p-3">
                        <h2>{dashboardStats.totalUsers}</h2>
                        <hr />
                        <h5>Users</h5>
                      </div>
                    </div>
                  </div>
                  <div>
                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th className="p-3">Tiffin Service Name</th>
                          <th>Image Path</th>
                          <th>Phone No.</th>
                          <th>Address</th>
                          <th>Delete</th>
                          <th>Stats</th>
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
                              <button onClick={() => handleDelete(tiffin.serviceId)} className="btn btn-danger deleteButton">Delete</button>
                            </td>
                            <td>
                              <a className="btn btn-primary statsButton" href="/admin-stats">Stats</a>
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
      </div>
    </div>
  );

}

export default Admin;