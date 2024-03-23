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
// export const dismissAll = createAsyncThunk('notificationPanel/dismissAll', async () => {
//   const response = await axios.delete('/api/notifications');
//   await response.data;

//   return true;
// });

// export const dismissItem = createAsyncThunk('notificationPanel/dismissItem', async (id) => {
//   const response = await axios.delete(`/api/notifications/${id}`);
//   await response.data;

//   return id;
// });
// export const deleteProperty = createAsyncThunk(
//   "adminNotifications/deleteProperty",
//   async ({ token, propertyId }) => {
//     const response = await fetch(`https://reileadsapi.exerboost.in/upkeep/app/admin/delete/landlord/${propertyId}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: getAccessToken()
//       }
//     });
//     const data = await response.json();
//     return data; // You can handle the response as needed
//   }
// );


// export const createProperty = createAsyncThunk(
//   "adminNotifications/createProperty",
//   async ({ token, propertyData }) => {
//     // console.log(propertyData)

//     const formData = new FormData();

//     // Append form data fields to the FormData object
//     Object.keys(propertyData).forEach(key => {
//       formData.append(key, propertyData[key]);
//     });

//     const response = await fetch("https://reileadsapi.exerboost.in/upkeep/app/landlord/create/property", {
//       method: 'POST',
//       headers: {
//         Authorization: getAccessToken()
//       },
//       body: formData
//     });
//     const data = await response.json();
//     return data; // You can handle the response as needed
//   }
// );
//update
// export const updateProperty = createAsyncThunk(
//   "adminNotifications/updateProperty",
//   async ({ editData, updatepropertyId}) => {
    // console.log(propertyData)

//     // const formData = new FormData();

//     // // Append form data fields to the FormData object
//     // Object.keys(editData).forEach(key => {
//     //   formData.append(key, editData[key]);
//     // });
//     const response = await fetch(`https://reileadsapi.exerboost.in/upkeep/app/admin/update/landlord/${updatepropertyId}`, {
//       method: 'PATCH',
//       headers: {
//         Authorization: getAccessToken(),
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(editData)
//     });
//     const data = await response.json();
//     return data; // You can handle the response as needed
//     //comment
//   }
// );

const propertySlice = createSlice({
  name: "property",
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
      // Remove the dismissed notification from the state
      state.adminNotifications = state.adminNotifications.filter(notification => notification._id !== action.payload);
    },
    // [dismissItem.fulfilled]: (state, action) =>
    // notificationsAdapter.removeOne(state, action.payload),
    // [dismissAll.fulfilled]: (state, action) => notificationsAdapter.removeAll(state),

    // [deleteProperty.pending]: (state) => {
    //   state.loading = true;
    // },
    // [deleteProperty.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   // Remove the deleted property from the state
    // },
    // [deleteProperty.rejected]: (state) => {
    //   state.loading = false;
    // },

    // [createProperty.pending]: (state) => {
    //   state.loading = true;
    // },
    // [createProperty.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   // You can handle the response if needed
    // },
    // [createProperty.rejected]: (state) => {
    //   state.loading = false;
    //   // Handle the rejection if needed
    // },
    // [updateProperty.pending]: (state) => {
    //   state.loading = true;
    // },
    // [updateProperty.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   // You can handle the response if needed
    // },
    // [updateProperty.rejected]: (state) => {
    //   state.loading = false;
    //   // Handle the rejection if needed
    // },
  },
});
export const { removeNotification } = propertySlice.actions;
export default propertySlice.reducer;
