import "./Checkout.css"

function Checkout(){
    return (
        <section className="w-100 clearfix lbCheckOut" id="lbCheckOut">
         <div className="container">
            <div className="lbCheckOutInner">
               <form>
                  <div className="lbCheckOutHeading">
                     <h5>Your Order</h5>
                  </div>
                  <div className="lbCheckOutBox">
                     <div className="row">
                        <div className="col-md-12 col-xl-6 ">
                           <table className=" table">
                            <tr className="col-md-12 ">
                                <td className="col-md-2">
                                    <div className="lbCheckOutImg">
                                       <img src="images/cart-img1.png" alt="card-img" className="img-fluid lbCheckOutImg"/>
                                    </div>
                                </td>
                                <td className="col-md-6 p-3">
                                <h5 >Regular Thali</h5>
                                       <p className="mb-0">Paneer Chatpata / Dalfry / 5 Roti / Jeera Rice / Raita / 1 Sweet / Salad / Papad ets.</p>
                                          <div >
                                          <a href="javascrit:void(0);" className="text-warning text-decoration-none removetext">
                                          <img src="images/remove.png" width="19" height="21"/>
                                          <span >  Remove Product</span>
                                       </a>
                                          </div>
                                          
                                </td>
                                <td className="col-md-2 text-center">
                                <div className="lbCheckOutQuantity">
                                    <span>1 Item</span>
                                 </div>
                                </td>
                                <td className="col-md-2 text-center">
                                <div className="lbCheckOutPrice">
                                    <span>$ 5.49</span>
                                 </div>
                                </td>
                            </tr> 
                            <tr className="col-md-12 ">
                                <td className="col-md-2">
                                    <div className="lbCheckOutImg">
                                       <img src="images/cart-img1.png" alt="card-img" className="img-fluid lbCheckOutImg"/>
                                    </div>
                                </td>
                                <td className="col-md-6 p-3">
                                <h5 >Regular Thali</h5>
                                       <p className="mb-0">Paneer Chatpata / Dalfry / 5 Roti / Jeera Rice / Raita / 1 Sweet / Salad / Papad ets.</p>
                                          <div >
                                          <a href="javascrit:void(0);" className="text-warning text-decoration-none removetext">
                                          <img src="images/remove.png" width="19" height="21"/>
                                          <span >  Remove Product</span>
                                       </a>
                                          </div>
                                          
                                </td>
                                <td className="col-md-2 text-center">
                                <div className="lbCheckOutQuantity">
                                    <span>1 Item</span>
                                 </div>
                                </td>
                                <td className="col-md-2 text-center">
                                <div className="lbCheckOutPrice">
                                    <span>$ 5.49</span>
                                 </div>
                                </td>
                            </tr>
                           </table>
                        </div>
                        <div className="col-md-12 col-xl-6">
                           <div className="lbCheckOutDetail">
                              
                              <div className="lbProductsPriceTbl">
                                 <table className="table">
                                    <tbody>
                                       <tr>
                                          <td>Cart Total</td>
                                          <td><strong>$10.98</strong></td>
                                       </tr>
                                       <tr>
                                          <td>Delivery</td>
                                          <td><strong>Free</strong></td>
                                       </tr>
                                       <tr>
                                          <td><span>Total</span></td>
                                          <td><strong>$10.98</strong></td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="lbCheckOutFormDetail">
                     <div className="row">
                        <div className="col-md-12 col-lg-8">
                           
                        <div className="col-md-12 col-lg-4">
                              <div className="lbCheckOutHeading">
                                 <h5>Payment Info.</h5>
                              </div>
                              <div className="lbPaymentInfo">
                              <div className="lbCheckOutPayment mb-0">
                                 <div className="custom_radio">
                                    <label className="form-label">Payment Method:</label>
                                    <div className="formLabel">
                                       <input type="radio" id="featured-1" name="payment" checked/><label for="featured-1">
                                          <span className="ratioIcon">
                                             <img src="images/icon/credit.png" alt="icon" className="img-fluid"/>
                                          </span>
                                          Credit Card</label>
                                    </div>
                                    <div className="formLabel">
                                       <input type="radio" id="featured-2" name="payment"/><label for="featured-2">
                                          <span className="ratioIcon">
                                             <img src="images/icon/paypal.png" alt="icon" className="img-fluid"/>
                                          </span>
                                          UPI</label>
                                    </div>
                                    <div className="yourInfoBtn">
                                       <div className="yourInfoBtnGroup">
                                          <button type="submit" className="btn btn-warning ">Pay Now</button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                           
                        </div>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </section>
    );
}

export default Checkout;