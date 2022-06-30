import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import * as notebooksActions from "../../store/notebooks";
import * as notesActions from "../../store/notes";
import * as tagsActions from "../../store/tags";
import * as trashActions from "../../store/trash";

//nav, home, notespage, notebookspage, tagspage,trashpage,
import Navigation from "../Main/Navigation/Navigation";
import HomePage from "./Home/HomePage";

import NotesPage from "./NotePage/index.js";
import NotebooksPage from "./NotebookPage/index.js";
// import TagsPage from "./Tags/index.js";
import TrashPage from "./TrashPage/index.js";

const Main = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		if (sessionUser) {
			dispatch(notebooksActions.getAllNotebooks());
			dispatch(notesActions.getAllNotes());
			dispatch(tagsActions.getAllTags());
			dispatch(trashActions.getAllTrash());
		}
	}, [sessionUser, dispatch]);

	if (!sessionUser) return <Redirect to="/" />;

	return (
		<div className="desktop-container">
            <Navigation sessionUser={sessionUser} />
            <Switch>
                <Route path="/home">
                    <HomePage />
                </Route>
                <Route path="/notes">
                    <NotesPage />
                </Route>
                <Route path="/notebooks">
                    <NotebooksPage />
                </Route>
                {/* <Route path={["/tags", "/tags/:tagId"]}>
                    <TagsPage />
                </Route> */}
                <Route path="/trash">
                    <TrashPage />
                </Route>
            </Switch>
		</div>
	);
};

export default Main;
