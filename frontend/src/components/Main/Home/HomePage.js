import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as sessionActions from '../../../store/session';
import { useDispatch } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import ScratchPad from './scratchPad';
import "./Homepage.css";

function HomePage(){

  const sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) {
    return <Redirect to={'/'} />
  }

  const greetingMessage = () => {
		const time = new Date().getHours();
		let greeting;
		if (time < 12) {
			greeting = "Good morning";
		} else if (time < 18) {
			greeting = "Good afternoon";
		} else {
			greeting = "Good evening";
		}
		return greeting;
	};

  const date = new Date();

  const monthsList = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  const monthName = monthsList[date.getMonth()];
  const dateDisplay = `${monthName} ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <main className="homepage">
      <div className='homepage-content'>
      <h1 className='greeting-text'>{greetingMessage()}, {sessionUser.username}</h1>
      <h1 className='date-display'>{dateDisplay}</h1>
      <div className='bkg-overlay'/>
        <Navigation/>   
        {/* <NoteBookBox/> */}
        <ScratchPad/>
      </div>
    </main>
  );
}

export default HomePage;