import { combineReducers } from '@reduxjs/toolkit';
// import applications from "./applicationSlice"
// import approvalList from './approvalListSlice'
// import communityList from './communityListSlice'
// import rawDataReport from './rawDataReportSlice'
// import transform from './transformSlice';
import adminLandlord from './adminLandlordSlice'

const transformReducers = combineReducers({
    // applications,
    // approvalList,
    // communityList,
    // rawDataReport,
    // transform
    adminLandlord
})
export default transformReducers