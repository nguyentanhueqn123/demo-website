import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  email: string;
  password: string;
  token: string | null;
}

const initialState: LoginState = {
  email: "",
  password: "",
  token: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setEmail, setPassword, setToken } = loginSlice.actions;

export default loginSlice.reducer;
