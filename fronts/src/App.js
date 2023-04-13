import React from 'react';
import './App.css';
import Nav from './coponents/Nav';
import Footer from './coponents/Footer';
import Signup from './pages/signup';
import Login from './pages/login';
import Messes from './pages/messpg';
import DetainMess from './pages/detailitems';
import PrivateNav from './coponents/privateNav';
import CustomerPage from './pages/spg/customer';
import DetailCustomer from './pages/spg/detailcustomer';
import Profile from './pages/profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route element={<PrivateNav />}>
            <Route path="/mess" element={<Messes />} />
            <Route path="/mess/:id" element={<DetainMess />} />
            <Route path="/detailcustomer/:id" element={<DetailCustomer />} />
            <Route path="/logout" element={<h1>Logout</h1>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/addcustomer" element={<CustomerPage/>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
