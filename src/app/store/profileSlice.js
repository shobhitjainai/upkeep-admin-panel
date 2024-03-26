import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "src/app/constant/apiRoutes";

export const getprofile = createAsyncThunk(
  "profile/getprofile",
  async (token) => {
    const response = await fetch("https://reileadsapi.exerboost.in/upkeep/app/auth/me", {
      headers: {
        Authorization: getAccessToken() // Include the token in the Authorization header
      }
    });
    const data = await response.json();
    return data.result;
  }
);


export const deleteProperty = createAsyncThunk(
  "profile/deleteProperty",
  async ({ token, propertyId }) => {
    const response = await fetch(`https://reileadsapi.exerboost.in/upkeep/app/admin/delete/landlord/${propertyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: getAccessToken()
      }
    });
    const data = await response.json();
    return data; // You can handle the response as needed
  }
);


// export const createProperty = createAsyncThunk(
//   "profile/createProperty",
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
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ editData, updateProfileId}) => {
    // console.log(propertyData)

    const formData = new FormData();

    // Append form data fields to the FormData object
    Object.keys(editData).forEach(key => {
      formData.append(key, editData[key]);
    });
    const response = await fetch(`https://reileadsapi.exerboost.in/upkeep/app/auth/update-profile`, {
      method: 'PATCH',
      headers: {
        Authorization: getAccessToken(),
        // 'Content-Type': 'application/json'
      },
      body: formData
    });
    const data = await response.json();
    return data; // You can handle the response as needed
    //comment
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: [],
    loading: false, 
  },
  extraReducers: {
    [getprofile.pending]: (state) => {
      state.loading = true;
    },
    [getprofile.fulfilled]: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    },
    [getprofile.rejected]: (state) => {
      state.loading = false;
    },
    [deleteProperty.pending]: (state) => {
      state.loading = true;
    },
    [deleteProperty.fulfilled]: (state, action) => {
      state.loading = false;
      // Remove the deleted property from the state
    },
    [deleteProperty.rejected]: (state) => {
      state.loading = false;
    },

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
    [updateProfile.pending]: (state) => {
      state.loading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.loading = false;
      // You can handle the response if needed
    },
    [updateProfile.rejected]: (state) => {
      state.loading = false;
      // Handle the rejection if needed
    },
  },
});

export default profileSlice.reducer;
