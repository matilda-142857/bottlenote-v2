import { csrfFetch } from "./csrf";

const GET_ALL_TAGS = "tags/GET_ALL_TAGS";
const ADD_UPDATE_TAG = "tags/ADD_UPDATE_TAG";
const DELETE_TAG = "tags/DELETE_TAG";

const getTags = (tags) => {
	return {
		type: GET_ALL_TAGS,
		tags,
	};
};

const addUpdateTag = (tag) => {
	return {
		type: ADD_UPDATE_TAG,
		tag
	};
};

const deleteTag = (tagId) => {
	return {
		type: DELETE_TAG,
		tagId
	};
};

export const getAllTags = () => async (dispatch) => {
	const response = await csrfFetch(`/api/tags`);
	const data = await response.json();
	dispatch(getTags(data));
	return response;
};

//for later: make an update for tags maybe

export const addNewTag = (tag) => async (dispatch) => {
	const response = await csrfFetch(`/api/tags`, {
        headers: {
            "Content-Type": "application/json",
        },
		method: "POST",
		body: JSON.stringify(tag),
	});
	const data = await response.json();
	dispatch(addUpdateTag(data));
	return response;
};

export const deleteOneTag = (tagId) => async (dispatch) => {
	const response = await csrfFetch(`/api/tags/${tagId}`, {
		method: "DELETE",
	});
	const data = await response.json();
	dispatch(deleteTag(data));
};

const initialState = {};

const tagReducer = (state = initialState, action) => {

	let newState;

	switch (action.type) {

		case GET_ALL_TAGS:
			newState = {};
			action.tags.forEach((tag) => {
				newState[tag.id] = tag;
			});
			return newState;

		case ADD_UPDATE_TAG:
			newState = { ...state };
			newState[action.tag.id] = action.tag;
			return newState;

		case DELETE_TAG:
			newState = { ...state };
			delete newState[action.tagId];
			return newState;

		default:
			return state;
	}
};

export default tagReducer;
