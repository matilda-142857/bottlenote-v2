import { Switch, Route } from "react-router-dom";

import NotebookSidebar from "./NotebookSidebar";
import NotePage from "../NotePage/NoteEdit";
import AllNotebooks from "./AllNotebooks";
import NoteLess from "./NotelessBookPage";

const NotebookPages = () => {
	return (
		<Switch>
			<Route path="/notebooks" exact>
				<AllNotebooks />
			</Route>
			<Route path="/notebooks/:notebookId" exact>
				<main className="note-control">
					<NotebookSidebar />
					<NoteLess />
				</main>
			</Route>
			<Route path="/notebooks/:notebookId/:noteId" exact>
				<main className="note-control">
					<NotebookSidebar />
					<NotePage />
				</main>
			</Route>
		</Switch>
	);
};

export default NotebookPages;