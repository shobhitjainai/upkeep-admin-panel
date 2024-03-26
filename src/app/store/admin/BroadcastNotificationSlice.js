import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "src/app/constant/apiRoutes";

export const getsendNotifications = createAsyncThunk(
  "sendNotifications/getsendNotifications",
  async ({ messageData }) => {
    // console.log(propertyData)

    // const formData = new FormData();

    // // Append form data fields to the FormData object
    // Object.keys(messageData).forEach(key => {
    //   formData.append(key, messageData[key]);
    // });

    const response = await fetch("https://reileadsapi.exerboost.in/upkeep/app/admin/send-notifications", {
      method: 'POST',
      headers: {
        Authorization: getAccessToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageData)
    });
    const data = await response.json();
    return data; // You can handle the response as needed
  }
  );
const broadcastNotificationSlice = createSlice({
  name: "property",
  initialState: {
    sendNotifications: [],
    loading: false, 
  },

  extraReducers: {
    [getsendNotifications.pending]: (state) => {
      state.loading = true;
    },
    [getsendNotifications.fulfilled]: (state, action) => {
      state.loading = false;
      // state.sendNotifications = action.payload;
    },
    [getsendNotifications.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default broadcastNotificationSlice.reducer;
