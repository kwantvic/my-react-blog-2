import {createStore, combineReducers, applyMiddleware} from 'redux';
import {authReducer} from "./reducers/auth";
import {postsReducer} from "./reducers/posts";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;

export default store;