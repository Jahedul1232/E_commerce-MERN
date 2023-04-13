import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router";


const DetainMess = () => { 
    const [item, setItems] = useState([]);
    const [pr, setPrice] = useState("");
    const [un, setUnit] = useState("");
    const [desc, setDesc] = useState("")
    let { id } = useParams();

    useEffect(() => {
        getItems();
    },[id]);

    const getItems = () => {
        let url = "http://localhost:5001/getitems/" + id;
        Axios.get(url)
            .then(response => {
                // console.log(response.data);
                setItems(response.data);
                setDesc("Description : ")
                setPrice("  tk")
                setUnit("Units : ")   
        })
            .catch(error => {
            alert("Error in getting data",error);
        // console.log("Error in getting data",error);
        });
    }
    
    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-12">
                    <h1>Details About {item.name}</h1>
                </div>
                <div className="col-10">
                    <div>
                <div className="block max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mt-5">
                    <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ item.unit}  {item.name}</h2>
                    <h5 className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.price}{pr}</h5>
                    <h5 className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.category}</h5>
                    <h5 className="mb-3 font-normal text-gray-700 dark:text-gray-400">{desc}{item.description}</h5> 
                    {/* <p className="font-normal text-gray-700 dark:text-gray-400">{un}{item.unit}</p> */}
                </div>
            </div>
                </div>
            </div>
            
        </div>
    );
}

export default DetainMess;