import React, {useState, useEffect} from 'react';


const Profile = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    let [userid, setUserid] = useState(user._id);
    let [name, setName] = useState(user.name);
    let [email, setEmail] = useState(user.email);
    let [role, setRole] = useState("not working");
    const [userlst, setUsers] = useState([]);

    useEffect(() => {
        console.log(user.roll=='admin', user.active==true);
        if(user.roll=='admin' && user.active==true){
            console.log("working");
            getUserList();
        }
    });

    const getUserList = async () => {
        let result = await fetch("http://localhost:5001/userlst");
        result = await result.json();
        console.warn(result);
        setUsers(result);
    }
    const setUserInfo = async () => {
        const data = JSON.stringify({
            uid: userid,
            name: name,
            email: email,
            role: role,
        })
        let url = "http://localhost:5001/updateuser";
        let result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        });
        console.warn(data);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6'>
                    <h1>{user.name}</h1>
                    <div>email: {user.email}</div>
                    <div>role: {user.role}</div>
                    <div>Approve: {user.active}</div>
                </div>
                <div className='col-6'>
                    <h3>Form</h3>
                    <div className='row'>
                        <div className='col-12 p-3'>
                            <label htmlFor="name" className='p-1'>Name</label>
                            <input type="text" className='form-control' name="name" defaultValue={user.name} onChange={(e)=>setName(e.target.naem)} />
                        </div>
                        <div className='col-12 p-3'>
                            <label htmlFor="email" className='p-1'>email</label>
                            <input type="text" className='form-control' name="email" defaultValue={user.email} onChange={(e)=>setEmail(e.target.email)} />
                        </div>
                        <div className='col-12 p-3'>
                            <label htmlFor="role" className='w-100 p-1'>Role : </label>
                            <label className='px-3'><input type='radio' name='role' value="admin" onChange={()=>setRole('admin')} /> Admin</label>
                            <label className='px-3'><input type='radio' name='role' value="user" onChange={()=>setRole('user')} /> User </label>
                            
                        </div>
                        <div className='col-12 p-3'>
                            <button className='btn btn-primary' onClick={setUserInfo}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;