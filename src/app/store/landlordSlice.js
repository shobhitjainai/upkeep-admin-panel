import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  properties: [
    {
      propertyname: "Property 1",
      totalroom: 10,
      price: 100000,
      propertycapacity: 20,
      address1: "Address Line 1",
      address2: "Address Line 2",
      city: "City 1"
    },
    {
      propertyname: "Property 2",
      totalroom: 15,
      price: 150000,
      propertycapacity: 30,
      address1: "Address Line 3",
      address2: "Address Line 4",
      city: "City 2"
    }
  ]
};

// Create slice
const landlordSlice = createSlice({
  name: 'landlord',
  initialState,
  reducers: {
    // You can add reducers here if you need to update the state
  },
});

// Export actions
export const {} = landlordSlice.actions;

// Export reducer
export default landlordSlice.reducer;
