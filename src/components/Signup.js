import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let nev= useNavigate();
  const handleSubmit =async  (e) => {
    const {name, email, password, cpassword} = user;
    if(cpassword !== password){
      alert("passwords do not match");
      
     e.preventDefault();
      return;
    }
    
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        
        body: JSON.stringify({name, email, password})
      }); 
      const json = await response.json();
      console.log(json);
      if(json.success){
        localStorage.setItem('token', json.authtoken);
        
        nev("/"); 
        console.log(json);
        props.showAlert("an account created successfully ", "success");
      }
      else{
        props.showAlert("Invalid Credentials", "danger");
      }
}

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const [user, setUser] = useState({ name:"",email: "",password: "", cpassword: "" });
  return (
    <div className="container">
      
      <form onSubmit={handleSubmit} >
        
      <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={user.name}
            name="name"
            onChange={onChange}
            placeholder="Enter Name"
            minLength={3}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={user.email}
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
            value={user.password}
            name="password"
            onChange={onChange}
            placeholder="Password"
            minLength={6}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            value={user.cpassword}
            name="cpassword"
            onChange={onChange}
            placeholder="confirm Password"
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
      
    </div>
  )
}

export default Signup;
