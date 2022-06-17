import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';

function HomePage({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  if (!sessionUser) {
    return <Redirect to={'/'} />
  }
  return (
    <ul>
        <h1>TESTING</h1>
        <li>{sessionUser.username}</li>
        <li>
            <button onClick={logout}>Log Out</button>
        </li>
    </ul>
  );
}

export default HomePage;