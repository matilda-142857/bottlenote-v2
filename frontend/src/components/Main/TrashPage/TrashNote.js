import React, { useEffect, useState, useContext } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import '../NotePage/NotePage.css';

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../NotePage/Quill";
import "react-quill/dist/quill.snow.css";

import { useSelector, useDispatch } from "react-redux";
import * as notesActions from '../../../store/notes';
import * as trashActions from '../../../store/trash';
// import * as notebookActions from '../../../store/notebooks';

const NoteTrash = () => {

	const { noteId } = useParams();

	const dispatch = useDispatch();
	const history = useHistory();

	const note = useSelector((state) => state.trash[noteId]);
    
	const deleteNote = async () => {
		await dispatch(trashActions.deleteOneTrash(noteId));
		await dispatch(trashActions.getAllTrash());
		history.push("/trash");
	};

	const restoreNote = async () => {
		const toRestore = { isTrashed: false };
		await dispatch(notesActions.trashNote(noteId, toRestore));
		await dispatch(trashActions.restoreNote(noteId));
		await dispatch(notesActions.restoredNote(note));
		history.push("/trash");
	};

	return (
		<>
			<div className="note-edit-box">
			 <button className='trash-note-delete' button onClick={() => deleteNote()}>
                Delete Note
              </button>
			  <button className='trash-note-restore' button onClick={() => restoreNote()}>
                Restore Note
              </button>

			  <div className="note-edit-bkg">
			  <textarea
			  	readOnly={true}
				// disabled={true}
				className="title-textarea"
				type="text"
				name="noteTitle"
				value={note?.title || ''}
				placeholder={"Untitled"}
			/>
			  <div className='note-edit-box'>
					<EditorToolbar/>
					<ReactQuill
						readOnly={true}
						// disabled={true}
						className="text-editor"
						theme="snow"
						type="text"
						name="noteTitle"
						value={note?.content || ''}
						placeholder={"Write something awesome..."}
						modules={modules}
						formats={formats}
					/>
				</div>
				{/* <div className="text-editor">
				<EditorToolbar />
				<ReactQuill
					theme="snow"
					type="text"
					name="noteTitle"
					value={noteContent}
					onChange={(e) => setNoteContent(e.target.value)}
					placeholder={"Write something awesome..."}
					modules={modules}
					formats={formats}
					/>
				</div> */}
			</div>
			</div>
		</>
	);
}


export default NoteTrash;
