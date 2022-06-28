import { Link } from "react-router-dom";
import { getAllNotes } from "../../store/notes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const NoteSidebar = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getAllNotes());
    }
  }, [dispatch, sessionUser])
  
  const notes = useSelector((state) => state.notes);
  const notesSorted = Object.values(notes).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt)
  );

  if (notesSorted.length) {
    return (
      <>
        {notesSorted.map((note) => (
          <Link to={`/notes/${note?.id}`} key={note?.id}>
            <div className="note-ele">
              <div className="note-title">{note?.title}</div>
              {/* <div className="-note-tags">
                {note &&
                  note.Tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="tag"
                    >
                      {tag.name}
                    </div>
                  ))}
              </div> */}
            </div>
          </Link>
        ))}
      </>
    );
  } 
  
  else {

    return (
      <div className="no-notes-wrap">
        <img
          src="/images/icon/note-not-found.svg"
          alt="Not found"
          className="no-notes-icon"
        />
        <div>No notes found</div>
      </div>
    );
  }
};

export default NoteSidebar;
