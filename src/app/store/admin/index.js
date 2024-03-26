import { combineReducers } from '@reduxjs/toolkit';
// import applications from "./applicationSlice"
// import approvalList from './approvalListSlice'
// import communityList from './communityListSlice'
// import rawDataReport from './rawDataReportSlice'
// import transform from './transformSlice';
import adminLandlord from './adminLandlordSlice'
import adminTenant from './adminTenantSlice'
import adminRepairer from './adminRepairerSlice'
import adminProperty from './adminPropertySlice'
import adminHome from './adminHomeSlice';
import broadcastNotification from './BroadcastNotificationSlice';
import notification from './notificationSlice';

const transformReducers = combineReducers({
    // applications,
    // approvalList,
    // communityList,
    // rawDataReport,
    // transform
    adminLandlord,
    adminTenant,
    adminRepairer,
    adminProperty,
    adminHome,
    notification,
    broadcastNotification
})
export default transformReducers