import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: undefined,
  user: {
    email: undefined,
    id: undefined,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {},
    login: (state, action) => {
      return action.payload;
    },
  },
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer;
