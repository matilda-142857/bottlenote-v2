import React, { useEffect, useState, useContext } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import * as notesActions from '../../../store/notes';
import * as trashActions from '../../../store/trash';
// import * as notebookActions from '../../../store/notebooks';

const NoteTrash = () => {

	const { noteId } = useParams();

	const dispatch = useDispatch();
	const history = useHistory();

	const note = useSelector((state) => state.trash[noteId]);
	console.log(note)
    
    const deleteNote = async () => {
        await dispatch(trashActions.deleteOneTrash(noteId));
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
			<textarea
				disabled
				className="title-textarea"
				type="text"
				name="noteTitle"
				value={note?.title}
				// onChange={(e) => setNoteTitle(e.target.value)
				// }
				placeholder={"Untitled"}
			/>
			 <button className='notebook-delete-forever' button onClick={() => deleteNote()}>
                Test Delete
              </button>
			  <button className='notebook-delete-forever' button onClick={() => restoreNote()}>
                Test Restore
              </button>
			  {/* <EditorToolbar /> */}
			  <textarea
			  	disabled
				className="text-editor"
				type="text"
				name="noteTitle"
				value={note?.content}
				// onChange={(e) => setNoteContent(e.target.value)}
				placeholder={"Write something awesome..."}
			/>
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
		</>
	);
}


export default NoteTrash;
