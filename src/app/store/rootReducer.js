import { combineReducers } from '@reduxjs/toolkit';
import fuse from './fuse';
import i18n from './i18nSlice';
import user from './userSlice';
import property from './propertySlice';
import tenant from './tenantSlice';
import landlord from './landlordSlice';
import home from './homeSlice';

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    fuse,
    i18n,
    user,
    property,
    tenant,
    landlord,
    home,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === 'user/userLoggedOut') {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
