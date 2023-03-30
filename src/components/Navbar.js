import React from "react";
import { Link , useLocation, useNavigate } from "react-router-dom";
// import { useEffect } from "react";

const Navbar = () => {
  let nev = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    nev("/login");
  };
  let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]); 

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" href="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className={`nav-item nav-link ${location.pathname === "/"?"active":""}`} to="/">
              Home
            </Link>
          </div>
          
          <form style={{"marginLeft" :"auto", "marginRight": "2%"}}>
          {!localStorage.getItem('token')?<div>
            
          <Link className="btn btn-primary mx-1 my-2 my-sm-0" to="/login" role="button">login</Link>
            <Link className="btn btn-primary my-1 my-sm-0" to="/signup" role="button">sign up</Link>
          </div>
            :
           <button onClick={logOut} className="btn btn-primary my-1 my-sm-0>">logout</button>}
           </form>
           
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
