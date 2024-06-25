import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("Added to your collection","success")
        setNote({ title: "", description: "", tag: "" })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label for="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>

                </div>
                <div className="mb-3">
                    <label for="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}  minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label for="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}  minLength={5} required>Add this Note</button>
            </form>
        </div>
    )
}

export default AddNote
