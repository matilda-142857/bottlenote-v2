import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import NoteSidebar from "./NoteSidebar";
import NoteEdit from "./NoteEdit";
import NoteLess from "../NotebookPage/NotelessBookPage";

const NotesPage = () => {

	const { noteId } = useParams();

	const note = useSelector((state) => state.notes[Number(noteId)]);

	return (
		<main className="note-control">
			<Navigation />
            <NoteSidebar/>
			<Route path="/notes" exact>
				<NoteLess />
			</Route>
			<Route path="/notes/:noteId">
				<NoteEdit note={note}/>
			</Route>
		</main>
	);
};

export default NotesPage;
