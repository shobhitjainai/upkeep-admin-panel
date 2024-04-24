import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "src/app/constant/apiRoutes";
// import axios from 'axios';
export const getNotifications = createAsyncThunk(
  "adminNotifications/getNotifications",
  async () => {
    const response = await fetch("https://reileadsapi.exerboost.in/upkeep/app/admin/fetch/notifications", {
      headers: {
        Authorization: getAccessToken() // Include the token in the Authorization header
      }
    });
    const data = await response.json();
    return data.result;
  }
);
export const dismissItem = createAsyncThunk(
  "adminNotifications/dismissItem",
  async (id) => {
    // Simulate dismissing the notification locally
    return id; // Return the id of the dismissed notification
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    adminNotifications: [],
    loading: false,
  },
  reducers: {
    // Define a reducer to remove a dismissed notification from the state
    removeNotification: (state, action) => {
      state.adminNotifications = state.adminNotifications.filter(notification => notification._id !== action.payload);
    },
  },
  extraReducers: {
    [getNotifications.pending]: (state) => {
      state.loading = true;
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminNotifications = action.payload;
    },
    [getNotifications.rejected]: (state) => {
      state.loading = false;
    },
    [dismissItem.fulfilled]: (state, action) => {
      state.adminNotifications = state.adminNotifications.filter(notification => notification._id !== action.payload);
    },
  },
});
export const { removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
