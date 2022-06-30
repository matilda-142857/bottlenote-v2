import { Route } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import TagsSidebar from "./TagsSidebar";

const TagsPage = () => {
	return (
		<main className="note-control">
			<Navigation />
            <TagsSidebar/>
		</main>
	);
};

export default TagsPage;
