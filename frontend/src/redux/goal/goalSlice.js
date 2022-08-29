import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

export const createGoal = createAsyncThunk(
  "create/goal",
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await goalService.registerGoal(user, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getGoals = createAsyncThunk("get/goal", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token;
    return await goalService.getGoal(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const removeGoal = createAsyncThunk(
  "remove/goal",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await goalService.deleteGoal(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  goals: [],
  pending: false,
  success: false,
  error: false,
  message: "",
};

const goalSlice = createSlice({
  name: "goal",
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.pending = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.pending = false;
        state.success = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.pending = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.pending = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.pending = false;
        state.success = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.pending = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(removeGoal.pending, (state) => {
        state.pending = true;
      })
      .addCase(removeGoal.fulfilled, (state, action) => {
        state.pending = false;
        state.success = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(removeGoal.rejected, (state, action) => {
        state.pending = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
