import { Link, useHistory } from "react-router-dom";
import { getAllTrash } from "../../../store/trash";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../NotePage/NotePage.css";
import * as trashActions from "../../../store/trash";

const TrashSidebar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const notes = useSelector((state) => state.trash);

  const emptyTrash = async () => {
    await dispatch(trashActions.emptyAllTrash());
  };

  const notesSorted = Object.values(notes).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt)
  );

  useEffect(() => {
    if (sessionUser) {
      dispatch(getAllTrash());
    }
  }, [dispatch, sessionUser]);

  if (notesSorted.length) {
    return (
      <>
        <div className="notes-box">
          <div className="notes-box-top">
            <div className="notes-box-name">
              <i className="fas fa-book-open" id="openbook-icon"></i>
              Your Trashed Notes
            </div>
            <div className="notes-box-number-buttons">
              {notesSorted.length} notes
              <button className="trash-all" onClick={emptyTrash}>
                Empty Trash
              </button>
            </div>
          </div>
          {notesSorted.map((note) => (
            <Link to={`/trash/${note.id}`} key={note.id}>
              <div className="note-ele">
                <div className="note-title">{note.title}</div>
                <div className="note-content-preview">{note.content.replace(/(<([^>]+)>)/gi, "").slice(0, 60) + '...'}</div>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <div className="notes-box">
        <div className="notes-box-top">
           <div className="notes-box-name">
              <i className="fas fa-book-open" id="openbook-icon"></i>
              Your Trashed Notes
            </div>
            <div className="notes-box-number-buttons">
              {notesSorted.length} notes
              <button className="trash-all" onClick={emptyTrash}>
                Empty Trash
              </button>
            </div>
        </div>
        <div className="note-box-end">
          <div className="empty-graphic">
            <i className="fas fa-paper-plane"></i>
          </div>
          <div>Nothing in your trash</div>
        </div>
      </div>
    );
  }
};

export default TrashSidebar;
