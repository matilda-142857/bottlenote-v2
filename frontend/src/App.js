import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
// import Navigation from "./components/Navigation";
import SplashPage from "./components/Splash/Splash";
import HomePage from "./components/Home/HomePage";
import NotesPage from "./components/NotePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <SplashPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/notes">
          <NotesPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;