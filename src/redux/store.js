// store.js
import { createStore, combineReducers } from "redux";
import { providerReducer } from "./reducers"; // Import your reducers
import { loadFromLocalStorage, saveToLocalStorage } from "./localStore";

// Combine your reducers
const rootReducer = combineReducers({
  provider: providerReducer,
});

// Load persisted state from local storage
const persistedState = loadFromLocalStorage();

// Create the Redux store
const store = createStore(rootReducer, persistedState);

// Subscribe to save state to local storage whenever it changes
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
