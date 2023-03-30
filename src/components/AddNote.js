import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    if(note.tag.length ===0){
      note.tag = "General";
    }
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("added note successfully", "success");
  };
  const onChange = (e) => {
    //...note is used to copy the previous state
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <div className="container my-3">
        <h3>add a note</h3>
        <form className="my-3">
          <div className="form-group my-3">
            <label htmlFor="title">title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="enter title"
              onChange={onChange}
              minLength={3}
              value={note.title}
              required
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="desc">enter description</label>
            <input
              type="text"
              className="form-control"
              id="desc"
              name="description"
              placeholder="enter description"
              onChange={onChange}
              minLength={5}
              required
              value={note.description}
            />
          </div>
          
          <div className="form-group my-3">
            <label htmlFor="tag">enter tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              placeholder="enter tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>
          <button
            disabled={note.title.length<3 || note.description.length<5}
            type="submit"
            onClick={handleClick}
            className="btn btn-primary"
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
