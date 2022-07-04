import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import * as notebooksActions from "../../../store/notebooks";
import * as notesActions from "../../../store/notes";
import * as trashActions from "../../../store/trash";

function DeleteModal() {

	const { notebookId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const notebook = useSelector((state) => state.notebooks[notebookId]);

	const deleteNB = async () => {
		await dispatch(notebooksActions.deleteANotebook(notebook));
		await dispatch(notesActions.trashAllNotebookNotes(notebookId));
		await dispatch(notesActions.getAllNotes());
		await dispatch(trashActions.getAllTrash());
		history.push("/notes");
	};

	return (
	<div className="new-nb-container">
        <div className="new-nb-title">Delete this notebook?</div>
        <div className="delete-nb-message">
			Your notes will be moved to the trash.
		</div>
        <div className="new-nb-buttons">
			<button className='notebook-modal-delete' button onClick={() => deleteNB()}>
                Confirm
            </button>
        </div>
    </div>
    );
};

export default DeleteModal;
