import { Route } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import NoteSidebar from "./NoteSidebar";

const NotesPage = () => {
	return (
		<main className="note-control">
			<Navigation />
            <NoteSidebar/>
			{/* <Route path="/notes" exact>

			</Route>

			</Route> */}
		</main>
	);
};

export default NotesPage;
