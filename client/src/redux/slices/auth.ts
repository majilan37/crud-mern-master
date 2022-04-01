import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserLogin } from "../../types";
import { authService } from "../services/auth";

interface AuthinitialState {
  user: User | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: AuthinitialState = {
  user: JSON.parse(localStorage.getItem("user") as string) as User | null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData: UserLogin, { rejectWithValue }) => {
    try {
      return authService.login(userData);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    userData: Pick<User, "username" | "email"> & { password: string },
    { rejectWithValue }
  ) => {
    try {
      return authService.register(userData);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return authService.logout();
  } catch (err) {
    console.log(err);
    return err;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Successfully logged in";
        state.user = action.payload as User;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Could not log in";
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Successfully logged out";
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Could not log out";
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Successfully registered";
        state.user = action.payload as User;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Could not register";
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
