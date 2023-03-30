import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

const Notes = (props) => {
  const nev = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, updateNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    }
    else
    {
      nev("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const editNote = (cnote) => {
    ref.current.click();
    setNote({id:cnote._id,etitle:cnote.title, edescription:cnote.description, etag:cnote.tag})
    // console.log(cnote);
  };
  
  const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "General" });

  const handleClick = (e) => {
    if(note.etag.length ===0)
       note.etag = "General";
  
   
    updateNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("updated note successfully", "success");  
  };
  const onChange = (e) => {
    
    //...note is used to copy the previous state
    setNote({
      
      ...note,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                edit note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group my-3">
                  <label htmlFor="etitle">title</label>
                  <input
                    type="text"
                    value={note.etitle}
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    placeholder="enter title"
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="edesc">enter description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edesc"
                    value={note.edescription}
                    name="edescription"
                    placeholder="enter description"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                
                <div className="form-group my-3">
                  <label htmlFor="etag">enter tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    value={note.etag}
                    name="etag"
                    placeholder="enter tag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length<3 || note.edescription.length<5}  onClick={handleClick} type="button" className="btn btn-primary">
                update Note
              </button>
            </div>
          </div>
        </div>
       </div> 

      <div className="row my-3">
        <h3>your notes</h3>
        <div className="container">
        {notes.length === 0 && "no notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} showAlert={props.showAlert} updateNote={editNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
