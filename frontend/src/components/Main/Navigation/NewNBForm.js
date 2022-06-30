import React, { useState, useEffect } from "react";
import * as notebookActions from "../../../store/notebooks";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './Navigation.css';

function NewNotebookFormContent() {
    const dispatch = useDispatch();
    const notebooks = useSelector((state) => state.notebooks);
	const [title, setTitle] = useState("");
	const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleSubmit = async (e) => {
		e.preventDefault();
		const notebook = { title };
		const newNotebook = await dispatch(notebookActions.addNotebook(notebook));
		setTitle("");
		history.push(`/notebooks/${newNotebook.id}`);
	};

    useEffect(() => {
        const errors = [];
		const titleExists = Object.values(notebooks).some(
			(notebook) => notebook.title === title
		);
		if (title.length < 1 || title.length > 50) {
			errors.push("Notebook name must be between 1 and 50 characters");
		} else if (titleExists) {
			errors.push("Notebook already exists");
		}
        setErrors(errors);
	}, [title]);

    return (
    <div className="new-nb-container">
        <div className="new-nb-title">Create a new notebook:</div>
        <form onSubmit={handleSubmit}>
        
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title your notebook..."
            className="nb-title-input"
            required
        />
        <div className="new-nb-buttons">
            <button
                className="btn nb-create"
                type="submit"
                onClick={handleSubmit}
                disabled= {errors.length > 0 }>
                Create
            </button>
        </div>
        <ul className='new-nb-errors'>
            {errors.map((error, idx) => ( 
            <li key={idx}>{error}</li>
            ))}
        </ul>
        </form>
    </div>
    );
};

export default NewNotebookFormContent;
