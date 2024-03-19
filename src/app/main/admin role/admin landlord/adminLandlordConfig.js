import i18next from 'i18next';
import en from '../i18n/en';
import tr from '../i18n/tr';
import ar from '../i18n/ar';
import hin from '../i18n/hin';
import { authRoles } from 'src/app/auth';
import AdminLandlord from './AdminLandlord';

i18next.addResourceBundle('en', 'propertyPage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);
i18next.addResourceBundle('hin', 'propertyPage', hin);

const adminLandlordConfig = {
  settings: {
    layout: {
      config: {},
    },
  },

  auth: authRoles.admin,
  routes: [
    {
      path: 'adminlandlord',
      element: <AdminLandlord />,
    },
  ],
};

export default adminLandlordConfig;