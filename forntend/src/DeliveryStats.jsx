import './DeliveryStats.css'

function DeliveryStats(){
    return(

        <div >
            <table className="text-center table table-bordered ">
                <tr>
                    <th className="py-3">
                       Order No. 
                    </th>
                    <th>
                        Items
                    </th>
                    <th>
                        Status
                    </th>
                    
                </tr>
                <tr>
                    <td >
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
                        <a className="btn  statusbtn">Delivered</a>
                    </td>
                    
                </tr>
                
            </table>
        </div>

    );
}
export default DeliveryStats;