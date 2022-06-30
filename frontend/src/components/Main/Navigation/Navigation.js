import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllNotebooks } from "../../../store/notebooks";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import NotebookDropdown from "./DropdownNB";
import TagsDropdown from "./DropdownTags";
import ProfileButton from "./ProfileButton";
import $ from "jquery";

const Navigation = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [showNotebooks, setShowNotebooks] = useState(false);
  const [showTags, setShowTags] = useState(false);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getAllNotebooks());
    }
  }, [dispatch, sessionUser])

  $('.fa-chevron-circle-left').on('click', function () {
    $(this).toggleClass('rotate')
  })

  return (
    <main className="navigation">
      <div className="navigation-side">
        <div className="navigation-top">
          <div className="profile-button"></div>
          <ProfileButton/>
          <p className="profile-icon">{sessionUser.username}</p>
        </div>
        
          <ul>

              <li><NavLink to="/home" className="navitem"><i class="fas fa-home"></i> Home</NavLink></li>

              <li><NavLink to="/notes" className="navitem"><i class="fas fa-file"></i> Notes</NavLink></li>

              <li><NavLink to="/notebooks" className="navitem notebooktab"><i class="fas fa-solid fa-book"></i> Notebooks</NavLink>
                <i className="fas fa-chevron-circle-left"
                onClick={() => setShowNotebooks(!showNotebooks)}></i> 
                {showNotebooks && <NotebookDropdown/>}
              </li>

              <li className="navitem"
                onClick={() => setShowTags(!showTags)}>
                <i className="fas fa-solid fa-tags"></i> Tags
                {showTags && <TagsDropdown/>}
              </li>

              <li><NavLink to="/trash" className="navitem"><i class="fas fa-trash"></i> Trash</NavLink></li>

          </ul> 
      </div>
    </main>
  );
};

export default Navigation;