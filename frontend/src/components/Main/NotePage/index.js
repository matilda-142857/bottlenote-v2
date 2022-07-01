import { Route } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import NoteSidebar from "./NoteSidebar";
import NoteEdit from "./NoteEdit";
import NoteLess from "../NotebookPage/NotelessBookPage";

const NotesPage = () => {
	return (
		<main className="note-control">
			<Navigation />
            <NoteSidebar/>
			<Route path="/notes" exact>
				<NoteLess />
			</Route>
			<Route path="/notes/:noteId">
				<NoteEdit />
			</Route>
		</main>
	);
};

export default NotesPage;
