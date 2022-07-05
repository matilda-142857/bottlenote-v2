import React, { useEffect, useState, useContext } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import "./NotePage.css";

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./Quill";
import "react-quill/dist/quill.snow.css";

import { useSelector, useDispatch } from "react-redux";
import * as notesActions from "../../../store/notes";
import * as trashActions from "../../../store/trash";

const NoteEdit = () => {
  const { noteId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const notes = useSelector((state) => state.notes);
  // const notebooks = useSelector((state) => state.notebooks);
  // const tags = useSelector((state) => state.tags);

  const note = useSelector((state) => state.notes[Number(noteId)]);

  const [noteTitle, setNoteTitle] = useState(note?.title || "");
  const [noteContent, setNoteContent] = useState(note?.content || "");
  const [thisNoteId, setThisNoteId] = useState(note?.id || 0);

  useEffect(() => {
    dispatch(notesActions.editNote(noteId, { title: noteTitle }));
  }, [noteTitle]);

  useEffect(() => {
    dispatch(notesActions.editNote(noteId, { content: noteContent }));
  }, [noteContent]);

  useEffect(() => {
    if (note && note.id !== thisNoteId) {
      setNoteTitle(note.title);
      setNoteContent(note.content);
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
  };

  return (
    <>
      <div className="note-edit-box">
        <button
          className="notebook-delete"
          button
          onClick={() => moveToTrash()}>
          Delete this Note
        </button>
        <div className="note-edit-bkg">
				<textarea
					className="title-textarea"
					type="text"
					name="noteTitle"
					value={noteTitle}
					onChange={(e) => setNoteTitle(e.target.value)}
					placeholder={"Untitled"}
				/>
				<div className='note-edit-box'>
					<EditorToolbar/>
					<ReactQuill
						className="text-editor"
						theme="snow"
						type="text"
						name="noteTitle"
						value={noteContent}
						onChange={setNoteContent}
						placeholder={"Write something awesome..."}
						modules={modules}
						formats={formats}
					/>
				</div>
				
		  </div>
          {/* <textarea
				className="text-editor"
				type="text"
				name="noteTitle"
				value={noteContent}
				onChange={(e) => setNoteContent(e.target.value)}
				placeholder={"Write something awesome..."}
			/> */}
        </div>

    </>
  );
};

export default NoteEdit;
