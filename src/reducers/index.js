// src/reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import documentReducer from "./document";
import userReducer from "./user";

const rootReducer = combineReducers({
  document: documentReducer,
  user: userReducer,
});

export default rootReducer;
