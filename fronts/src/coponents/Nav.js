import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = JSON.parse(localStorage.getItem('user'));
  const role = localStorage.getItem("role");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <div>
<nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item"><Link className='nav-link' to="/">Home</Link></li>
        { auth ? role=="admin" ? <li className="nav-item"><Link className='nav-link' to="/mess">Product</Link></li> : "" : "" }
        { auth ? <li className="nav-item"><Link className='nav-link' to="/addcustomer">Add Customer</Link></li> : "" }
        { auth ? <li className="nav-item"><Link className='nav-link' to="/profile">Profile</Link></li> : "" }
        <li className="nav-item">{ auth ?  <Link className='nav-link' onClick={logout} to="/signup">Logout</Link>: <Link className='nav-link' to="/login">Signup</Link>}</li>
      </ul>
    </div>
  </div>
</nav>
        </div>
    );
}

export default Nav;