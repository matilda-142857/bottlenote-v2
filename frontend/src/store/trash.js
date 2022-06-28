import { csrfFetch } from "./csrf";

const GET_ALL_TRASH = "trash/GET_ALL_TRASH";
const DELETE_FOREVER = "trash/DELETE_FOREVER";
const EMPTY_TRASH = "trash/EMPTY_TRASH";
const RESTORE_NOTE = "trash/RESTORE_NOTE";

const getTrash = (trash) => {
	return {
		type: GET_ALL_TRASH,
		trash,
	};
};

export const deleteNote = (noteId) => {
	return {
		type: DELETE_FOREVER,
		noteId,
	};
};

export const emptyTrash = () => {
	return {
		type: EMPTY_TRASH,
	};
};

export const restoreNote = (note) => {
	return {
		type: RESTORE_NOTE,
		note,
	};
};

export const getAllTrash = () => async (dispatch) => {
	const response = await csrfFetch("/api/trash");
	const data = await response.json();
	dispatch(getTrash(data));
	return response;
};

export const deleteOneTrash = (noteId) => async (dispatch) => {
	const response = await csrfFetch(`/api/trash/${noteId}`, {
		method: "DELETE",
	});
	const data = await response.json();
	dispatch(deleteNote(data));
	return response;
};

export const emptyAllTrash = () => async (dispatch) => {
	const response = await csrfFetch("/api/trash", {
		method: "DELETE",
	});
	const data = await response.json();
    dispatch(emptyTrash());
	return response;
};

const initialState = { trash: null };

const trashReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_ALL_TRASH:
			newState = {};
			action.trash.forEach((note) => {
			newState[note.id] = note;
            });
			return newState;
		case DELETE_FOREVER:
			newState = { ...state };
			delete newState[action.note.id];
			return newState;
        case RESTORE_NOTE:
            newState = { ...state };
            newState[action.note.id] = action.note;
            newState[action.note.id].isTrashed = false;
            return newState;   
		case EMPTY_TRASH:
			return {};
		default:
			return state;
	}
};

export default trashReducer;
