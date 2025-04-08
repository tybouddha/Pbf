// src/reducers/user.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface pour l'état de l'utilisateur
interface UserState {
  value: {
    token: string | null;
    projectId: string | null;
    username: string | null;
    email: string | null;
    tokenProject: string | null;
    role: string | null;
  };
}

// État initial typé
const initialState: UserState = {
  value: {
    token: null,
    projectId: null,
    username: null,
    email: null,
    tokenProject: null,
    role: null,
  },
};

// Interface pour le payload de loginUser
interface LoginPayload {
  token: string;
  projectId: string;
  username: string;
  email: string;
  tokenProject: string;
  role: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<LoginPayload>) => {
      // console.log(`- dans Redux: loginUser 🔔`);
      state.value.token = action.payload.token;
      state.value.projectId = action.payload.projectId;
      state.value.tokenProject = action.payload.tokenProject;
      state.value.username = action.payload.username;
      state.value.role = action.payload.role;
      state.value.email = action.payload.email;
    },
    logoutUser: (state) => {
      // console.log(`- dans Redux: logoutUser 🔔`);
      state.value.token = null;
      state.value.projectId = null;
      state.value.tokenProject = null;
      state.value.username = null;
      state.value.role = null;
      state.value.email = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

// Export du type de l'état pour réutilisation
export type { UserState };
