import "./App.css";
import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
      <NoteState>   
      <Router>  
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route path="/"  element={<Home showAlert={showAlert}/>} />
            <Route exact path="/login"   element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup"   element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
