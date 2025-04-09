import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./src/reducers"; // Ajusté le chemin relatif

export const store = configureStore({
  reducer: rootReducer,
});

// Typage du state global
export type RootState = ReturnType<typeof store.getState>;

// Typage du dispatch (utile pour plus tard)
export type AppDispatch = typeof store.dispatch;

export default store;
