import { useLocation, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react'


const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate("/login");
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser({name:userData.name, email:userData.email, imageUrl:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"});
    }
    // Google Analytics
    console.log(location);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">myNotebook</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} href="/about">About</a>
            </li>
          </ul>
          {!localStorage.getItem('token') ? <form className="d-flex" role="search">
            <a className="btn btn-primary mx-2" href="/signup" role="button">SignUp</a>
            <a className="btn btn-primary mx-2" href="/login" role="button">Login</a>


          </form> : <>
          {user && (
                <div className="d-flex align-items-center mx-2">
                  <img src={user.imageUrl} alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                  <span className="text-light">{user.name}</span>
                </div>
              )}
          <button className="btn btn-primary mx-2" onClick={handleLogout}>Logout</button>
          </>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
