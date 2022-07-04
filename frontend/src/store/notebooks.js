import { csrfFetch } from "./csrf";
import notesReducer, { getAllNotes } from "./notes";

const GET_ALL_NOTEBOOKS = "notebooks/GET_ALL_NOTEBOOKS";
const ADD_UPDATE_NOTEBOOK = "notebooks/ADD_UPDATE_NOTEBOOK";
const DELETE_NOTEBOOK = "notebooks/DELETE_NOTEBOOK";

const getNotebooks = (notebooks) => {
	return {
		type: GET_ALL_NOTEBOOKS,
		notebooks,
	};
};

const addUpdateNotebook = (notebook) => {
	return {
		type: ADD_UPDATE_NOTEBOOK,
		notebook,
	};
};

const deleteNotebook = (notebookId) => {
	return {
		type: DELETE_NOTEBOOK,
		notebookId,
	};
};

export const getAllNotebooks = () => async (dispatch) => {
	const response = await csrfFetch("/api/notebooks/");
	const data = await response.json();
	dispatch(getNotebooks(data));
	return response;
};

export const addNotebook = (notebook) => async (dispatch) => {
	const response = await csrfFetch("/api/notebooks", {
		method: "POST",
        headers: {
            "Content-Type": "application/json"
         },
		body: JSON.stringify(notebook),
	});
	const data = await response.json();
	dispatch(addUpdateNotebook(data));
	return data;
};

export const editNotebook = (notebook) => async (dispatch) => {
	const response = await csrfFetch(`/api/notebooks/${notebook.id}`, {
		method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
		body: JSON.stringify(notebook),
	});
	const data = await response.json();
	dispatch(addUpdateNotebook(data));
	return data;
};

export const deleteANotebook = (notebook) => async (dispatch) => {
	const response = await csrfFetch(`/api/notebooks/${notebook.id}`, {
		method: "DELETE",
	});
	const data = await response.json();
	dispatch(deleteNotebook(data));
	return data;
};

const initialState = {};

const notebookReducer = (state = initialState, action) => {

	let newState;

	switch (action.type) {
		case GET_ALL_NOTEBOOKS:
			newState = {};
			action.notebooks.forEach((notebook) => {
				newState[notebook.id] = notebook;
			});
			return newState;

		case ADD_UPDATE_NOTEBOOK:
			newState = { ...state };
			newState[action.notebook.id] = action.notebook;
			return newState;

		case DELETE_NOTEBOOK:
			newState = { ...state };
			delete newState[action.notebookId];
			return newState;

		default:
			return state;
	}
};

export default notebookReducer;
