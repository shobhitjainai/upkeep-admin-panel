import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import hin from './i18n/hin';


i18next.addResourceBundle('en', 'profilePage', en);
i18next.addResourceBundle('tr', 'profilePage', tr);
i18next.addResourceBundle('ar', 'profilePage', ar);
i18next.addResourceBundle('hin', 'profilePage', hin);

import Profile from './Profile'
import { authRoles } from 'src/app/auth';

const PropertyConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:authRoles.admin,
  routes: [
    {
      path: '/apps/profile',
      element: <Profile />,
    },
  ],
};

export default PropertyConfig;