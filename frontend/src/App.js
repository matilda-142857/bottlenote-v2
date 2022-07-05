import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import SplashPage from "./components/Splash/Splash";
import HomePage from "./components/Main/Home/HomePage";
import Main from "./components/Main/index";

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
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route
					path={[
						"/notes",
						"/notes/:noteId",
						"/notebooks",
						"/notebooks/:notebookId",
						"/notebooks/:notebookId/:noteId",
						"/tags",
						"/tags/:tagId",
						"/trash",
					]}
				>
					<Main />
				</Route>
      </Switch>
    </>
  );
}

export default App;