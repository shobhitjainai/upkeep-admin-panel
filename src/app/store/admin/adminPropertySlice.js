import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "src/app/constant/apiRoutes";

export const getadminProperties = createAsyncThunk(
  "adminProperties/getadminProperties",
  async (pageNumber) => {
    const response = await fetch(`https://reileadsapi.exerboost.in/upkeep/app/admin/fetch-property?${pageNumber}`, {
      headers: {
        Authorization: getAccessToken() // Include the token in the Authorization header
      }
    });
    const data = await response.json();
    return data.result;
  }
);


export const deleteProperty = createAsyncThunk(
  "adminProperties/deleteProperty",
  async ({ token, propertyId }) => {
    const response = await fetch(`https://reileadsapi.exerboost.in/upkeep/app/admin/delete/property/${propertyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: getAccessToken()
      }
    });
    const data = await response.json();
    return data; // You can handle the response as needed
  }
);


export const createProperty = createAsyncThunk(
  "adminProperties/createProperty",
  async ({ token, propertyData }) => {
    // console.log(propertyData)

    const formData = new FormData();

    // Append form data fields to the FormData object
    Object.keys(propertyData).forEach(key => {
      formData.append(key, propertyData[key]);
    });

    const response = await fetch("https://reileadsapi.exerboost.in/upkeep/app/landlord/create/property", {
      method: 'POST',
      headers: {
        Authorization: getAccessToken()
      },
      body: formData
    });
    const data = await response.json();
    return data; // You can handle the response as needed
  }
);
//update
export const updateProperty = createAsyncThunk(
  "adminProperties/updateProperty",
  async ({ editData, updatepropertyId}) => {
    // console.log(propertyData)

    // const formData = new FormData();

    // // Append form data fields to the FormData object
    // Object.keys(editData).forEach(key => {
    //   formData.append(key, editData[key]);
    // });
  
    const response = await fetch(`https://reileadsapi.exerboost.in/upkeep/app/admin/update/property/${updatepropertyId}`, {
      method: 'PATCH',
      headers: {
        Authorization: getAccessToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editData)
    });
    const data = await response.json();
    return data; // You can handle the response as needed
    //comment
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState: {
    adminProperties: [],
    loading: false, 
    searchInput: '',
  },
  reducers: {
    handleSearchInput: (state,action) => {
      state.searchInput = action.payload;
    }
  },
  extraReducers: {
    [getadminProperties.pending]: (state) => {
      state.loading = true;
    },
    [getadminProperties.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminProperties = action.payload;
    },
    [getadminProperties.rejected]: (state) => {
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

    [createProperty.pending]: (state) => {
      state.loading = true;
    },
    [createProperty.fulfilled]: (state, action) => {
      state.loading = false;
      // You can handle the response if needed
    },
    [createProperty.rejected]: (state) => {
      state.loading = false;
      // Handle the rejection if needed
    },
    [updateProperty.pending]: (state) => {
      state.loading = true;
    },
    [updateProperty.fulfilled]: (state, action) => {
      state.loading = false;
      // You can handle the response if needed
    },
    [updateProperty.rejected]: (state) => {
      state.loading = false;
      // Handle the rejection if needed
    },
  },
});


export const {handleSearchInput} = propertySlice.actions
export default propertySlice.reducer;
