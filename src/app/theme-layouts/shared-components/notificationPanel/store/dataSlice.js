import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAccessToken } from 'src/app/constant/apiRoutes';

// export const getNotifications = createAsyncThunk('notificationPanel/getData', async () => {
//   const response = await axios.get('/api/notifications');
//   const data = await response.data;

//   return data;
// });

export const getNotifications = createAsyncThunk(
  'notificationPanel/getData',
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

export const dismissAll = createAsyncThunk('notificationPanel/dismissAll', async () => {
  const response = await axios.delete('/api/notifications');
  await response.data;

  return true;
});

export const dismissItem = createAsyncThunk('notificationPanel/dismissItem', async (id) => {
  const response = await axios.delete(`/api/notifications/${id}`);
  await response.data;

  return id;
});

export const addNotification = createAsyncThunk(
  'notificationPanel/addNotification',
  async (item) => {
    const response = await axios.post(`/api/notifications`, { ...item });
    const data = await response.data;

    return data;
  }
);

const notificationsAdapter = createEntityAdapter({});

const initialState = notificationsAdapter.upsertMany(notificationsAdapter.getInitialState(), []);

export const { selectAll: selectNotifications, selectById: selectNotificationsById } =
  notificationsAdapter.getSelectors((state) => state.notificationPanel.data);

const dataSlice = createSlice({
  name: 'notificationPanel/data',
  initialState,
  reducers: {},
  extraReducers: {
    [dismissItem.fulfilled]: (state, action) =>
      notificationsAdapter.removeOne(state, action.payload),
    [dismissAll.fulfilled]: (state, action) => notificationsAdapter.removeAll(state),
    [getNotifications.fulfilled]: (state, action) =>
      notificationsAdapter.addMany(state, action.payload),
    [addNotification.fulfilled]: (state, action) =>
      notificationsAdapter.addOne(state, action.payload),
  },
});

export default dataSlice.reducer;
