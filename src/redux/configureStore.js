import { createStore, applyMiddleware, compose } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import thunk from "redux-thunk";
import {setAuthorizationHeader} from "../api/apiCalls";

const secureLS = new SecureLS();

const getStateFromStorage = () => {
    const authData = secureLS.get('login-auth');

    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    };

    if (authData) {
        return authData;
    }
    return stateInLocalStorage;
}

const updateStateInStorage = (newState) => {
    secureLS.set('login-auth', newState);
}

const configureStore = () => {
    const initialState = getStateFromStorage();
    setAuthorizationHeader(initialState);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
    store.subscribe(() => {
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
    });

    return store;
}

export default configureStore;