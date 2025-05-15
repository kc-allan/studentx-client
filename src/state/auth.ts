import { User } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";


export interface AuthState {
	user: User | null;
	role: string | null;
}

export interface RootState {
	auth: AuthState;
}

const initialValue = {
	user: null,
	role: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialValue,
	reducers: {
		setCurrentUser(state, action) {
			state.user = action.payload.user;
			state.role = action.payload.role;
		},
		setLogout(state) {
			window.location.href = "/auth?page=login";
			state.user = null;
		},
	},
});

export const { setCurrentUser, setLogout } = authSlice.actions;

export const authReducer = authSlice.reducer;
