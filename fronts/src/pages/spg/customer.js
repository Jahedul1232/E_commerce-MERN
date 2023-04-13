import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
// import MessMember from "./messmember";

const CustomerPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [selmess, setSelmess] = useState(null);

    const saveItems = async () => {
        const data = JSON.stringify({
            name: name,
            contact: contact,
            address: address,
            email: email,
            createdby: user._id,
        })
        let url = "http://localhost:5001/creatcustomer";
        // if(selmess!=null)
        //     url = "http://localhost:5001/productupdate/"+selmess;
            
        let result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        });
        console.warn("data is ",result.message);
      alert("Customer is Added Successfully");
      setName("");
      setContact("");
      setAddress("");
      setEmail("");
      
    }
    // console.log(selmess);
    const [messlst, setCustomer] = useState([]);
    useEffect(() => {
        getCustomer();
    }, []);
    const getCustomer = async () => {
        let result = await fetch("http://localhost:5001/getcustomer");
        result = await result.json();
        console.warn(result);
        setCustomer(result);
    }

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-5">
                    <h1>Customer's List </h1>
        {/* <li className="nav-item"><Link className='nav-link' to="/mess/hello world">One Mess</Link></li> */}
                    <ul className="list-group">
                        {messlst.map((match, ind) => (
                          <li className="list-group-item" key={match._id} >{ind + 1}: {match.name} <Link to={"/detailcustomer/" + match._id} >Detail{match._id}</Link> </li>
                        ))}
                    </ul>
                </div>
                <div className="col-6">
                    {/* <div>
                        {selmess!=null? <MessMember ids={selmess} />: ''}
                    </div> */}
                    <h4>Add Customer</h4>
                    <div className="mt-3">
                        <input type="text" name="name" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Shahrukh khan" />
                    </div>
                    <div className="mt-3">
                        <input type="number" name="contact" className="form-control" value={contact} onChange={(e)=>setContact(e.target.value)} placeholder="016*****" />
                    </div>
                    <div className="mt-3">
                        <input type="text" name="category" className="form-control" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Palashi, BUET" />
                    </div>
                    <div className="mt-3">
                        <input type="text" name="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="abc@gmail.com" />
                    </div>
                    {/* <div className="mt-3">
                        <input type="number" name="unit" className="form-control" value={units} onChange={(e)=>setUnit(e.target.value)} placeholder="Unit" />
                    </div> */}
                    <div className="mt-3">
                        <button className="btn btn-primary me-3" onClick={saveItems}>{selmess==null? "Submit": "Edit"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerPage;