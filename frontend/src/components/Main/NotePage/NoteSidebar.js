import { Link, useHistory, useParams } from "react-router-dom";
import * as notebookActions from "../../../store/notebooks";
import * as notesActions from "../../../store/notes"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './NotePage.css';

const NoteSidebar = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const notes = useSelector((state) => state.notes);
  
  const [title, setTitle] = useState("Untitled");
	const [content, setContent] = useState("");
	const [isTrashed, setisTrashed] = useState(false);

  const newBooklessNote = async () => {
    const noteToAdd = { title: "Untitled", content, notebookId: '1', isTrashed: false};
    const newNoteId = await dispatch(notesActions.addNewNote(noteToAdd));
    history.push(`/notebooks/1/${newNoteId}`);
  };

  const notesSorted = Object.values(notes).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt)
  );

  useEffect(() => {
    if (sessionUser) {
      dispatch(notesActions.getAllNotes());
    }
  }, [dispatch, sessionUser])

  if (notesSorted.length) {
    return (
      <>
      <div className="notes-box">
        <div className="notes-box-top">
            <div className ="notes-box-name">
            <i className="fas fa-book-open" id="openbook-icon"></i>
                Your Notes
            </div>
            <div className="notes-box-number-buttons">
                {notesSorted.length} notes 
                <button className='notebook-newnote-notepage' button onClick={() => newBooklessNote()}>
                {/* <i className="fas fa-plus"></i> */}
                New Note
                </button>
            </div>
        </div>
        {notesSorted.map((note) => (
          <Link to={`/notes/${note.id}`} key={note.id}>
            <div className="note-ele">
              <div className="note-title">{note.title}</div>
              <div className="note-content-preview">
                {note.content.slice(0, 35) + '...'}
              </div>
            </div>
          </Link>
        ))}
        <div className="note-box-end">
              End of your notes  
              <i className="fas fa-paper-plane"></i>
        </div>
        </div>
      </>
    );
  } 
  
  else {

    return (
      <div className="notes-box">
        <div className="notes-box-top">
            <div className ="notes-box-name">
            <i className="fas fa-book-open" id="openbook-icon"></i>
              Your Notes
            </div>
            <div className="notes-box-number-buttons">
                {notesSorted.length} notes 
                <button className='notebook-newnote' button onClick={() => newBooklessNote()}>
                {/* <i className="fas fa-plus"></i> */}
                New Note
                </button>
            </div>
        </div>
        <div className="note-box-end">
          <div className='empty-graphic'>
            <i className="fas fa-signature"></i>
            <i className="fas fa-pen"></i>
          </div>
          <div>It starts with a note...</div>
        </div>
      </div>
    );
  }
};

export default NoteSidebar;
