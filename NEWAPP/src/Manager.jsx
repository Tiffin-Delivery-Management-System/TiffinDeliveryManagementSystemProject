import AddTiffin from './AddTiffin';
import './Manager.css'

function Manager() {

    return (

        <div>
            <div className="container myService">
                <div className="myServiceInner">

                    <div className="navTabs">

                        <ul className="nav nav-pills nav-justified">
                            <li className="nav-item">
                                <a className="nav-link active" data-bs-toggle="pill" href="#my-order">

                                    <p className="mb-0">My Order</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " data-bs-toggle="pill" href="#my-service">

                                    <p className="mb-0">My Service</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " data-bs-toggle="pill" href="#my-tiffin">

                                    <p className="mb-0">Add Tiffin</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " data-bs-toggle="pill" href="#my-stats">

                                    <p className="mb-0">My Stats</p>
                                </a>
                            </li>


                        </ul>
                    </div>
                    <div className="tabContent">
                        <div className="tab-content">
                            <div className="tab-pane " id="my-service">
                                <div className="myServiceContent">
                                    <div className="row">
                                        <div className="">
                                            <div className="myServiceBx lbPersonalInformation">
                                                <div className="serviceHeading">
                                                    <h4>Service Information</h4>
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
                                            <div className="row">
                                                <div className="col-md-12">

                                                    <form action="">
                                                        <div className="myServiceBx lbChangePassword">
                                                            <div className="serviceHeading">
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
                                                                    <div className="col-md-6">

                                                                    </div>
                                                                    <div className="col-md-6">
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
                                                                    <div className="col-md-6">

                                                                    </div>
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
                                                    </form>
                                                </div>


                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane active" id="my-tiffin">
                                <AddTiffin />
                            </div>
                            <div className="tab-pane active" id="my-order">
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
                                                    <button className="btn btn-success statusbtn">Out for Delivered</button>
                                                </td>

                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                            <div className="tab-pane" id='my-stats'>
                                <div className="adminDetailsRow row">

                                    <div className=" col-md-6 p-5">
                                        <div className="adminDetails p-3">

                                            <h2>100</h2>
                                            <hr />
                                            <h5>Orders</h5>
                                        </div>
                                    </div>
                                    <div className=" col-md-6 p-5">
                                        <div className="adminDetails p-3">

                                            <h2>5000</h2>
                                            <hr />
                                            <h5>Revenue</h5>
                                        </div>
                                    </div>

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

                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td>
                                                    Order No.
                                                </td>
                                                <td>
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
                                                    Delivered
                                                </td>

                                            </tr>
                                            <tr>
                                                <td>
                                                    Order No.
                                                </td>
                                                <td className="py-4">
                                                    <table className="text-center table table-borderless ">
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
                                                    Delivered
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

    );

}

export default Manager;