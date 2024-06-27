import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLoginButton } from "react-social-login-buttons";

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://inotebook-7q5s.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Login Successful", "success");
        } else {
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="d-flex justify-content-center mt-3">
            <div className="card p-4" style={{ width: '400px', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)' }}>
                <h2 className="my-2 text-center">Log in to your account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email} name="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">Please enter your registered email</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-warning mb-2" style={{ padding: '10px 25px', fontSize: '14px', borderRadius: '25px' }}><strong>Submit</strong></button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <GoogleLoginButton onClick={() => alert("Feature to be developed")} style={{ width: 'auto', padding: '10px 25px', margin: '5px 15px', fontSize: '14px', borderRadius: '25px', fontWeight: 'bold' }} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
