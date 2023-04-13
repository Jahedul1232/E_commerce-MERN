import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";


const Signup = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [conpassword, setConPassword] = useState("");
    let [name, setName] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("user"));
        if (auth) {
            navigate("/");
        }
    })
    const collectData = async () => {
        
        if(password === conpassword){
            let result = await fetch("http://localhost:5001/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name
                })
            });
            result = await result.json();
            console.log(result);
            if(result.message === "User Already Exist"){
                alert("User Already Exist");
            }
            else{
                localStorage.setItem("user", JSON.stringify(result));
                alert('Login Successfully');
                navigate("/");
                
            }
            
        }
    }

    return (
        <div className="container">
            <div className="row"> <div className="col-md-6 offset-md-3">
                <div className="mb-3">
                    <h1 className="text-3xl font-bold text-gray-600 text-center mt-10">Registration</h1></div>
                    <div className="mb-3">
                        <input className="form-control" type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="mb-3"><input className="form-control" type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} /></div>
                    <div className="mb-3"><input className="form-control" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/></div>
                    <div className="mb-3"><input className="form-control" type="password" placeholder="Confirm Password" value={conpassword} onChange={(e)=>setConPassword(e.target.value)} /></div>
                    <div className="mb-3">
                        <Link className="btn btn-secondary me-3" to="/login">Already have an account?</Link>
                        <input className="btn btn-primary me-3" type="submit" value="Register" onClick={collectData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;