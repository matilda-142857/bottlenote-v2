import { Link, useHistory, useParams } from "react-router-dom";
import * as notebookActions from "../../../store/notebooks";
import * as notesActions from "../../../store/notes"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const NotebookSidebar = () => {

  const { noteId, notebookId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const notebook = useSelector((state) => state.notebooks[notebookId]);

  const notes = Object.values(useSelector((state) => state.notes)).filter(
		(note) =>
			note.notebookId === parseInt(notebookId, 10) && 
      note.isTrashed === false
	);

  useEffect(() => {
    if (sessionUser) {
      dispatch(notebookActions.getAllNotebooks());
    }
  }, [dispatch, sessionUser])

  const [title, setTitle] = useState("Untitled");
	const [content, setContent] = useState("");
	const [isTrashed, setisTrashed] = useState(false);
  const [setTags, setSetTags] = useState([]);
	const [errors, setErrors] = useState([]);
	const [tagDropdownList, setTagDropdownList] = useState([]);

		const newNote = async () => {
 
      const noteToAdd = { title: "Untitled", content, notebookId, isTrashed: false};
      
      const newNoteId = await dispatch(notesActions.addNewNote(noteToAdd));

      history.push(`/notebooks/${notebookId}/${newNoteId}`);
    };

  function deleteNB(){
    dispatch(notebookActions.deleteANotebook(notebook))
    history.push("/notes");
  }

  const notesSorted = Object.values(notes).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt)
  );

  if (notesSorted.length) {
    return (
      <>
      <div className="notes-box">
        <div className="notes-box-top">
            <div className ="notes-box-name">
            <i className="fas fa-book-open" id="openbook-icon"></i>
              {notebook.title}
            </div>
              <button className='notebook-newnote' button onClick={() => newNote()}>
                  Add a note
              </button>
              <button className='notebook-delete' button onClick={() => deleteNB()}>
                Test Delete
              </button>
            <div className="notes-box-number">
                {notesSorted.length} notes 
            </div>
            {/* <NavLink>
              New Note
            </NavLink> */}
           
        </div>
        {notesSorted.map((note) => (
          <Link to={`/notebooks/${notebookId}/${note.id}`} key={note.id}>
            <div className="note-ele">
              <div className="note-title">{note.title}</div>
              <div className="note-content-preview">
                {note.content}
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
              {notebook.title}
            </div>
              <button className='notebook-newnote' button onClick={() => newNote()}>
                Add a note
              </button>
              <button className='notebook-delete' button onClick={() => deleteNB()}>
                Test Delete
              </button>
            <div className="notes-box-number">
                {notesSorted.length} notes 
            </div>
        </div>
          <div className="no-notes-wrap">
            <i className="fas fa-signature"></i>
            <i className="fas fa-pen"></i>
            <div>It starts with a note...</div>
        </div>
      </div>
    );
  }
};

export default NotebookSidebar;
