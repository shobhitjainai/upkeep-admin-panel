import { combineReducers } from '@reduxjs/toolkit';
import adminLandlord from './adminLandlordSlice'
import adminTenant from './adminTenantSlice'
import adminRepairer from './adminRepairerSlice'
import adminProperty from './adminPropertySlice'
import adminHome from './adminHomeSlice';
import broadcastNotification from './BroadcastNotificationSlice';
import notification from './notificationSlice';

const transformReducers = combineReducers({
    adminLandlord,
    adminTenant,
    adminRepairer,
    adminProperty,
    adminHome,
    notification,
    broadcastNotification
})
export default transformReducers