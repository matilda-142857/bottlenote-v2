import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const UPDATE_PAD = "scratchPad/UPDATE_PAD";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const updatePad = (pad) => {
	return {
		type: UPDATE_PAD,
		pad,
	};
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case UPDATE_PAD:
      newState = { ...state };
      newState.user.scratchPad = action.pad;
      return newState;
    default:
      return state;
  }
};

  export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        credential,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
    };

export const demoLogin = () => async (dispatch) => 
{
    const credential = "Guest User";
    const password = "password";
    const res = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
        credential,
        password,
        }),
    });
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
    };

  export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

  export const updateScratchPad = (pad) => async (dispatch) => {
    const body = JSON.stringify(pad);
    const response = await csrfFetch(`/api/scratchpad`, {
      method: "PUT",
      body,
    });
  
    const data = await response.json();
    dispatch(updatePad(data));
    return data;
  };

export default sessionReducer;