import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import usersReducer from './users';
import notesReducer from "./notes";
import notebookReducer from "./notebooks";
import trashReducer from "./trash";

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

const rootReducer = combineReducers({
    session: sessionReducer,
    users: usersReducer,
    notes: notesReducer,
    notebooks: notebookReducer,
    trash: trashReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

export default configureStore;
