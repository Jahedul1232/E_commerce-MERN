import React from "react";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        let result = await fetch("http://localhost:5001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        result = await result.json();
        if (result.message === "Invalid Credentials") {
            alert("Login Unsuccessful");
        } else {
            if(result[0].active==true) localStorage.setItem("role", result[0].role);
            localStorage.setItem("user", JSON.stringify(result[0]));
            // console.log(JSON.stringify(result[0]))
            navigate("/");
        }
        
    }
    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-5">
                    <h1>Login form</h1>
                    <div className="mb-3">
                        <input className="form-control" type="text" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value )} />
                    </div>
                    <div className="mb-3">
                        <Link className="btn btn-secondary me-3" to="/signup">Dont Have Account</Link>
                        <button className="btn btn-primary me-3" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;