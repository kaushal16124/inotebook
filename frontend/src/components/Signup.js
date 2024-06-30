import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLoginButton } from "react-social-login-buttons";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';



//https://inotebook-7q5s.onrender.com
const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });



  useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);

          })
          .catch((err) => console.log(err))

       
      }
    },
    [user]
  );

  useEffect(() => {
    if (profile) {
      handleGoogleSubmit();
    }
  }, [profile]);

  const handleGoogleSubmit = async (e) => {
    console.log("Signup using Google triggered")
    // e.preventDefault();
    const response = await fetch("https://inotebook-7q5s.onrender.com/api/auth/createuser", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: profile.name, email: profile.email, password: "123456789" })
    });
    const json = await response.json();
    console.log(json);
    //redirect
    if (json.success) {
      //redirect
      localStorage.setItem('token', json.authtoken);
      localStorage.setItem('user', JSON.stringify(json.user));
      navigate("/")
      props.showAlert("Account created successfully", "success")
    } else {
      if (json.error === 'Duplicate user') {
        props.showAlert("User already exists", "danger");
      } else {
        props.showAlert("Invalid credentials", "danger");
      }
    }

  }


  const handleSubmit = async (e) => {
    console.log("Signup triggered")
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
      localStorage.setItem('user', JSON.stringify(json.user));
      navigate("/")
      props.showAlert("Account created successfully", "success")
    } else {
      if (json.error === 'Duplicate user') {
        props.showAlert("User already exists", "danger");
      } else {
        props.showAlert("Invalid credentials", "danger");
      }
    }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="d-flex justify-content-center mt-0" style={{ marginBottom: '15px' }}>
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
            <div className="d-flex justify-content-center">
              <GoogleLoginButton onClick={() => login()} style={{ width: 'auto', padding: '10px 25px', margin: '5px 15px', fontSize: '14px', borderRadius: '25px', fontWeight: 'bold' }}>Sign Up using Google</GoogleLoginButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
