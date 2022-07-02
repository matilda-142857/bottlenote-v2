import React, { useEffect, useState, useContext } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import "./NotePage.css";

import { useSelector, useDispatch } from "react-redux";
import * as notesActions from '../../../store/notes';
import * as trashActions from '../../../store/trash';
// import * as notebookActions from '../../../store/notebooks';

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./Quill";
import "react-quill/dist/quill.snow.css";

const NoteEdit = () => {

	const { noteId } = useParams();

	const dispatch = useDispatch();
	const history = useHistory();

	const notes = useSelector((state) => state.notes);
	// const notebooks = useSelector((state) => state.notebooks);
	// const tags = useSelector((state) => state.tags);

	const note = useSelector((state) => state.notes[Number(noteId)]);
	
	const [noteTitle, setNoteTitle] = useState(note?.title || '');
	const [noteContent, setNoteContent] = useState(note?.content || '');
	const [thisNoteId, setThisNoteId] = useState(note?.id || 0); 

	useEffect(() => {
		dispatch(notesActions.editNote(noteId, { title: noteTitle }));
	}, [noteTitle]);

	useEffect(() => {
		dispatch(notesActions.editNote(noteId, { content: noteContent}));
	}, [noteContent]);

	useEffect(() => {
		if ( note.id !== thisNoteId){
			setNoteTitle(note.title)
			setNoteContent(note.content)
			setThisNoteId(note.id);
		}
	}, [thisNoteId, note]);

	const moveToTrash = async () => {
		if (noteId !== "undefined") {
			const note = {
				isTrashed: true,
			};
			dispatch(notesActions.trashNote(noteId, note));
			dispatch(trashActions.getAllTrash());
			history.push("/notes");
		} else {
			history.push("/notes");
		}
	}

	return (
		<>
			<textarea
				className="title-textarea"
				type="text"
				name="noteTitle"
				value={noteTitle}
				onChange={(e) => setNoteTitle(e.target.value)
				}
				placeholder={"Untitled"}
			/>
			 <button className='notebook-delete' button onClick={() => moveToTrash()}>
                Test Delete
              </button>
			  {/* <EditorToolbar /> */}
			  <textarea
				className="text-editor"
				type="text"
				name="noteTitle"
				value={noteContent}
				onChange={(e) => setNoteContent(e.target.value)}
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


export default NoteEdit;
