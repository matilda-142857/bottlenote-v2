import { Route } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import TrashLess from "./TrashlessPage";
import NoteTrash from "./TrashNote";
import TrashSidebar from "./TrashSidebar";

const TrashPage = () => {
	return (
		<main className="note-control">
			<Navigation />
            <TrashSidebar/>
		<Route path="/trash" exact>
			<TrashLess />
		</Route>
		<Route path="/trash/:noteId">
			<NoteTrash />
		</Route>
	</main>
	);
};

export default TrashPage;
