import noteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

//get all notes
const getNotes = async () => {
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      "content-type": "application/json",
      "auth-token": localStorage.getItem("token")
    },  
  }); 
  const json = await response.json();
  console.log(json);
  setNotes(json);

};


    //Add a note
    const addNote = async (title, description, tag) => {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({title, description, tag}),

      }); 

    
      let note = await response.json();
      setNotes(notes.concat(note));
    };

    //Delete a note
    const deleteNote = async (id) => {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        },

      }); 

      const json = await response.json();
      console.log(json);
      let newNotes = notes.filter((note) => {return note._id !== id});
      console.log("Delete");
      setNotes(newNotes);
    };

    //Update a note
    const updateNote = async (id, title, description, tag) => {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({title, description, tag}),

      }); 

      const json = await response.json();
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes));
      for(let index=0; index < newNotes.length; index++){
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    };
    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, updateNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;




// import noteContext from "./noteContext";
// import React, { useState } from "react";

// const NoteState = (props) => {
//     const s1 = {
//         "name": "manali",
//         "class": "5b"
//     }
//     const [state, setState] = useState(s1);
//     const update = ()=>{
//         setTimeout(() => {
//             setState({
//                 "name": "manali2",
//                 "class": "10b"
//             })

//         }, 1000);
//     }
    //{{state, update}} means object {"state": stati ki value, "upaate": update ki value}
//     return (
//         <noteContext.Provider value={{state, update}}>
//             {props.children}
//         </noteContext.Provider>
//     )
// }

// export default NoteState;