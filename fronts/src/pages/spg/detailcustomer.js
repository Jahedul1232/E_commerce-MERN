import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router";


const DetailCustomer = () => { 
    const [cus, setCustomer] = useState([]);
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("")
    let { id } = useParams();

    useEffect(() => {
        getItems();
    },[id]);

    const getItems = () => {
        let url = "http://localhost:5001/detailcustomer/" + id;
        Axios.get(url)
            .then(response => {
                // console.log(response.data);
                setCustomer(response.data);
              setEmail("Email: ");
              setContact("Contact: ");
              setAddress("Address: ");
        })
            .catch(error => {
            alert("Error in getting data",error);
        // console.log("Error in getting data",error);
            });
      console.log(cus.name);
    }
    
    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-12">
                    <h1>Details About {cus.name}</h1>
                </div>
                <div className="col-10">
                    <div>
                <div className="block max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mt-5">
                    <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{cus.name}</h2>
                <h5 className="mb-3 font-normal text-gray-700 dark:text-gray-400">{contact }{cus.contact}</h5>
                <h5 className="mb-3 font-normal text-gray-700 dark:text-gray-400">{ email}{cus.email}</h5> 
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{ address}{cus.address}</p>
                    {/* <p className="font-normal text-gray-700 dark:text-gray-400">{un}{customer.unit}</p> */}
                </div>
            </div>
                </div>
            </div>
            
        </div>
    );
}

export default DetailCustomer;