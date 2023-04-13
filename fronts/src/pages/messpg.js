import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
// import MessMember from "./spg/messmember";

const Matchs = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [attributes, setAttribute] = useState("");
    const [details, setDetails] = useState("");
    const [district, setDistrict] = useState("");
    const [units, setUnit] = useState("");
    const [selmess, setSelmess] = useState(null);

    const saveItems = async () => {
        const data = JSON.stringify({
            name: name,
            price: price,
            category: attributes,
            description: details,
            unit: units,
            createdby: user._id,
        })
        console.log("data is ",data);
        let url = "http://localhost:5001/productcreate";
        if(selmess!=null)
            url = "http://localhost:5001/productupdate/"+selmess;
            
        let result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        });
        console.warn("data is ", data);
        alert("Product is successfully Added");
        getMess();
    }
    console.log(selmess);
    const [messlst, setMesses] = useState([]);
    useEffect(() => {
        getMess();
    }, []);
    const getMess = async () => {
        let result = await fetch("http://localhost:5001/getitem");
        result = await result.json();
        console.warn(result);
        setMesses(result);
    }

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-5">
                    <h1>All Items List </h1>
        {/* <li className="nav-item"><Link className='nav-link' to="/mess/hello world">One Mess</Link></li> */}
                    <ul className="list-group">
                        {messlst.map((match, ind) => (
                            <li className="list-group-item" key={match._id} >{ind + 1}: {match.name} <Link to={"/mess/" + match._id} >Detail</Link> </li>
                        ))}
                    </ul>
                </div>
                <div className="col-6">
                    {/* <div>
                        {selmess!=null? <MessMember ids={selmess} />: ''}
                    </div> */}
                    <h4>Add Item</h4>
                    <div className="mt-3">
                        <input type="text" name="name" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Product Name" />
                    </div>
                    <div className="mt-3">
                        <input type="number" name="price" className="form-control" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Product Price" />
                    </div>
                    <div className="mt-3">
                        <input type="text" name="category" className="form-control" value={attributes} onChange={(e)=>setAttribute(e.target.value)} placeholder="Product Category" />
                    </div>
                    <div className="mt-3">
                        <input type="text" name="details" className="form-control" value={details} onChange={(e)=>setDetails(e.target.value)} placeholder="Product Details" />
                    </div>
                    <div className="mt-3">
                        <input type="number" name="unit" className="form-control" value={units} onChange={(e)=>setUnit(e.target.value)} placeholder="Unit" />
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-primary me-3" onClick={saveItems}>{selmess==null? "Submit": "Edit"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Matchs;