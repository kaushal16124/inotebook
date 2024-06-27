import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("https://inotebook-7q5s.onrender.com/api/auth/createuser", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    //redirect
    if (json.success) {
      //redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/")
      props.showAlert("Account created successfully", "success")
    } else {
      props.showAlert("Invalid credentials", "danger")
    }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="d-flex justify-content-center mt-0" style={{ marginBottom:'15px'}}>
      <div className="card p-4" style={{ width: '400px', borderRadius: '20px', boxShadow: '0 8px 8px rgba(0, 0, 0, 0.8)' }}>
        <div className="container mt-1">
          <h2 className="my-1">Create your online Notebook</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name="password" minLength={5} required onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required onChange={onChange} />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-warning mb-2" style={{ padding: '10px 25px', fontSize: '14px', borderRadius: '25px' }}><strong>Create my account</strong></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
