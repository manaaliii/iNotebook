import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [auths, setAuths] = useState({ email: "", password: "" });
    let nev= useNavigate();
    const handleSubmit =async  (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              "content-type": "application/json",
            },
            
            body: JSON.stringify({email: auths.email, password: auths.password})
          }); 
          const json = await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token', json.authToken);
            props.showAlert("Login Successful", "success");
            nev("/");
          }
          else{
            props.showAlert("Invalid Credentials", "danger");
          }
    }
    const onChange = (e) => {
        setAuths({
          ...auths,
          [e.target.name]: e.target.value,
        });
      };
  return (

    <div>
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={auths.email}
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={auths.password}
            name="password"
            onChange={onChange}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
