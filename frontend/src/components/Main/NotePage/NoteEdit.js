import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import "./NotePage.css";
import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as notesActions from '../../../store/notes';
// import * as notebookActions from '../../../store/notebooks';

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./Quill";
import "react-quill/dist/quill.snow.css";

const NoteEdit = () => {

	const { noteId } = useParams();

	const dispatch = useDispatch();
	const history = useHistory();

	const notes = useSelector((state) => state.notes);
	const notebooks = useSelector((state) => state.notebooks);
	const tags = useSelector((state) => state.tags);

	// title, content, tags of note, and all tags
	//TODO: user can change nb name in the nbsidebar ele

	// const moveToTrash = async () => {
	// 	if (noteId !== "new") {
	// 		const note = {
	// 			isTrashed: true,
	// 		};
	// 		await dispatch(notesActions.trashNote(noteId, note));
	// 		history.push("/notes");
	// 	} else {
	// 		history.push("/notes");
	// 	}
	// };

	// const note = useSelector((state) => state.notes[noteId]);
	// const notebooks = useSelector((state) => state.notebooks);
	// const [content, setContent] = useState(note.content);

	// useEffect(() => {
	// 	dispatch(notesActions.editNote(
    //         { note: content }
    //     ));
	// }, [content]);

	// if ((noteId !== "undefined")) {
	// 	return (
	// 		<div className="text-editor">
	// 		  <EditorToolbar />
	// 		  <ReactQuill
	// 			theme="snow"
	// 			value={content}
	// 			onChange={(e) => setContent(e.target.value)}
	// 			placeholder={"Write something awesome..."}
	// 			modules={modules}
	// 			formats={formats}
	// 		  />
	// 		</div>
	// 	  );
	// } else {
		return (
			<div className="notebook-bg">
				<div className="notebook-container">
					<div className="notebook-ctnr-title">Select</div>
				</div>
			</div>
		);
	}
//};

export default NoteEdit;
