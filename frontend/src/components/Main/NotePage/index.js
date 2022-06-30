import { Route } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import NoteSidebar from "./NoteSidebar";
import NoteEdit from "./NoteEdit";

const NotesPage = () => {
	return (
		<main className="note-control">
			<Navigation />
            <NoteSidebar/>
			<Route path="/notes" exact>
				{/* <NotePage /> */}
			</Route>
			<Route path="/notes/:noteId">
				{/* <NotePage /> */}
			</Route>
		</main>
	);
};

export default NotesPage;
