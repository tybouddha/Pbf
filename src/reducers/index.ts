// src/reducers/index.ts
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import documentReducer from "./document";

const rootReducer = combineReducers({
  user: userReducer,
  document: documentReducer,
});

export default rootReducer;

// Optionnel : exporte le type du rootReducer pour vérification
export type RootReducer = typeof rootReducer;
