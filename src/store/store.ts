import { combineReducers, createStore } from "@reduxjs/toolkit";
import userTokenReducer from "./userToken";

export type RootState = ReturnType<typeof rootReducer>; // Define RootState first

const rootReducer = combineReducers({
  userToken: userTokenReducer,
});

const store = createStore(rootReducer); // Use createStore with rootReducer
export default store;
