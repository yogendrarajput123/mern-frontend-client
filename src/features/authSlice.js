import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE } from "../api/api";

const initialState = {
  user: localStorage.getItem("loggedInUser") || null,
  loading: false,
  error: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

//Login
export const login = createAsyncThunk(
  "auth/login",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();

      if (!result.success) throw result.error || result.message;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Sign up
export const signup = createAsyncThunk(
  "auth/signup",
  async (signupInfo, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();

      if (!result.success) throw result.error || result.message;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        //store token and username In redux state & localstorage
        //  success, message, jwtToken, name, error = result all are stored in backend - we extract here from result.
        state.token = action.payload.jwtToken;
        state.user = action.payload.name;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.jwtToken);
        localStorage.setItem("loggedInUser", action.payload.name);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
