import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserRole = "issuer" | "recipient" | null;

interface AuthState {
  selectedRole: UserRole;
}

const initialState: AuthState = {
  selectedRole: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSelectedRole: (state, action: PayloadAction<UserRole>) => {
      state.selectedRole = action.payload;
    },
  },
});

export const { setSelectedRole } = authSlice.actions;

export default authSlice.reducer;
