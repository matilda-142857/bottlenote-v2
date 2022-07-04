import { csrfFetch } from "./csrf";

const GET_ALL_NOTES = "notes/GET_ALL_NOTES";
const ADD_UPDATE_NOTE = "notes/ADD_UPDATE_NOTE";
const TRASH_NOTE = "notes/TRASH_NOTE";
const TRASH_NOTES = "notes/TRASH_NOTES";
const RESTORED_NOTE = "notes/RESTORED_NOTE";

const getNotes = (notes) => {
	return {
		type: GET_ALL_NOTES,
		notes
	};
};

const addUpdateNote = (note) => {
	return {
		type: ADD_UPDATE_NOTE,
		note
	};
};

const trashedNote = (note) => {
	return {
		type: TRASH_NOTE,
		note
	};
};

export const trashedNotes = (notes) => {
	return {
		type: TRASH_NOTES,
		notes
	};
};

export const restoredNote = (note) => {
	return {
		type: RESTORED_NOTE,
		note,
	};
};

export const getAllNotes = () => async (dispatch) => {
	const response = await csrfFetch(`/api/notes`);
	const data = await response.json();
	dispatch(getNotes(data));
	return response;
};

export const trashAllNotebookNotes = (notebookId) => async (dispatch) => {
	const response = await csrfFetch(`/api/notes/trash/${notebookId}`);
	const data = await response.json();
    console.log(data)
	dispatch(trashedNotes(data));
	return response;
};

export const addNewNote = (newNote) => async (dispatch) => {
	const response = await csrfFetch("/api/notes/new", {
        headers: {
            "Content-Type": "application/json",
        },
		method: "POST",
		body: JSON.stringify(newNote),
	});
	const data = await response.json();
	dispatch(addUpdateNote(data));
	return data.id;
};

export const editNote = (noteId, note) => async (dispatch) => {
	const response = await csrfFetch(`/api/notes/${noteId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
		body: JSON.stringify(note),
	});
    if (response.ok){
        const data = await response.json();
	    dispatch(addUpdateNote(data));
    }
	// return response;
};

//CHANGES iSTRASHED VALUE. Delete is in trash.js
export const trashNote = (noteId, note) => async (dispatch) => {
	const response = await csrfFetch(`/api/notes/${noteId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
		body: JSON.stringify(note),
	});
	const data = await response.json();
	dispatch(trashedNote(data));
	return response;
};

const initialState = {};

const notesReducer = (state = initialState, action) => {

	let newState;

	switch (action.type) {

		case GET_ALL_NOTES:
			newState = {...state};
			action.notes.forEach((note) => {
                if (!note.isTrashed){
			        newState[note.id] = note; 
                }})
			return newState;

		case ADD_UPDATE_NOTE:
			newState = { ...state };
			newState[action.note.id] = action.note;
			return newState;

        case TRASH_NOTE:
			newState = { ...state };
            // newState[action.note.id].isTrashed = true;
			delete newState[action.note.id];
			return newState;

        case TRASH_NOTES:
            newState = { ...state };
            action.notes.forEach((note) => {
                note.isTrashed = true;
                delete newState[note.id];
            })
            return newState;  

        case RESTORED_NOTE:
            newState = { ...state };
            newState[action.note.id] = action.note;
            newState[action.note.id].isTrashed = false;
            return newState;

        // case TRASH_NOTES:
        //     newState = { ...state };
        //     action.notes.forEach((note) => {
        //         newState[note.id].isTrashed = true;
        //         delete newState[note.id];
        //     })
        //     return newState;  

		default:
			return state;
	}
};

export default notesReducer;
