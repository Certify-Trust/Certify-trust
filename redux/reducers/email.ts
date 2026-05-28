import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  signUpEmail: string | null;
}

const initialState: AuthState = {
  signUpEmail: null,
};

const authSlice = createSlice({
  name: "signUpEmail",
  initialState,
  reducers: {
    setSignUpEmail: (state, action: PayloadAction<string | null>) => {
      state.signUpEmail = action.payload;
    },
  },
});

export const { setSignUpEmail } = authSlice.actions;

export default authSlice.reducer;
