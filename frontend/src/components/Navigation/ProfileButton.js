import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const letter = (sessionUser.username).charAt(0).toUpperCase();

  // if (letter === ['A' || 'B' || 'C' || 'D' || 'E' || 'F' || 'G' || 'H' || 'I' || 'J' || 'K' || 'L' || 'M' || 'N' || 'O' || 'P' || 'Q' || 'R' || 'S' || 'T' || 'U' || 'V' || 'W' || 'X' ||'Y' || 'Z']){ 
  //   let icon = `./ProfileIcons/${letter}.png`;
  //   }
  //   else {

  //   }

  if (!sessionUser) {
    return <Redirect to={'/'} />
  }

  return (
    <>
      <button onClick={openMenu} className="profile-button">
        <i className="fas fa-user-circle" />

      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;