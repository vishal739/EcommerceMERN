import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, checkUser } from "./authAPI";

const initialState = {
  value: 0,
  status: "idle",
  loggedIn: null,
  error:null
};


export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (data) => {
    console.log("data async: ", data )
    const response = await createUser(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (data) => {
    console.log("data async: ", data )
    const response = await checkUser(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const signOutAsync = createAsyncThunk(
  "user/signOut",
  async(data) =>{
    const response=data;
    return response;
  }
)
export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
   extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedIn = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedIn = action.payload;
        // console.log(state.loggedIn);
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedIn = action.payload;
        // console.log(state.loggedIn);
      })
  },
});

export const { increment } = userSlice.actions;


export const selectCheckUser = (state) => state.user.loggedIn;
export const selectError = (state) => state.user.error;


export default userSlice.reducer;
