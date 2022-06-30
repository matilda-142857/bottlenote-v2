import { Link, useHistory } from "react-router-dom";
import { getAllTags } from "../../../store/tags";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import '../NotePage/NotePage.css';

const TagsSidebar = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const tags = useSelector((state) => state.tags);

  const tagsSorted = Object.values(notes).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt)
  );

  useEffect(() => {
    if (sessionUser) {
      dispatch(getAllTags());
    }
  }, [dispatch, sessionUser])

  if (notesSorted.length) {
    return (
      <>
      <div className="notes-box">
        <div className="notes-box-top">
            <div className ="notes-box-name">
            <i className="fas fa-book-open" id="openbook-icon"></i>
                Your Tags
            </div>
            <div className="notes-box-number">
                {tagsSorted.length} notes 
            </div>
        </div>
        {notesSorted.map((note) => (
          <Link to={`/trash/${note.id}`} key={note.id}>
            <div className="note-ele">
              <div className="note-title">{note.title}</div>
              <div className="note-content-preview">
                {note.content}
              </div>
            </div>
          </Link>
        ))}
        </div>
      </>
    );
  } 
  
  else {

    return (
      <div className="no-notes-wrap">
        <i className="fas fa-paper-plane"></i>
        <div>Nothing in your trash</div>
      </div>
    );
  }
};

export default TrashSidebar;
