import { Route } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import TrashSidebar from "./TrashSidebar";

const TrashPage = () => {
	return (
		<main className="note-control">
			<Navigation />
            <TrashSidebar/>
		</main>
	);
};

export default TrashPage;
