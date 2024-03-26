import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import ExampleConfig from '../main/example/ExampleConfig';
import PropertyConfig from '../main/Property/PropertyConfig';
import landlordConfig from '../main/Landlord/landlordConfig';
import tenantConfig from '../main/Tenant/tenantConfig';
import AdminHomeConfig from '../main/admin role/admin home/AdminHomeConfig';
import profileConfig from '../main/Profile/profileConfig';
import adminLandlordConfig from '../main/admin role/admin landlord/adminLandlordConfig';
import adminTenantConfig from '../main/admin role/admin tenant/AdminTenantConfig';
import adminPropertyConfig from '../main/admin role/admin property/adminPropertyConfig';
import AdminRepairerConfig from '../main/admin role/admin repairer/AdminRepairerConfig';
import NotificationConfig from '../main/admin role/Push Notification/NotificationConfig';

const routeConfigs = [NotificationConfig,AdminRepairerConfig,adminPropertyConfig,adminTenantConfig,adminLandlordConfig,profileConfig,tenantConfig,AdminHomeConfig,ExampleConfig, SignOutConfig, SignInConfig, SignUpConfig,PropertyConfig,landlordConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/sign-in" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
