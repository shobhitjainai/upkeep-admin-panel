import i18next from 'i18next';
import en from '../i18n/en';
import tr from '../i18n/tr';
import ar from '../i18n/ar';
import hin from '../i18n/hin';
import AdminRepairer from './AdminRepairer';
import { authRoles } from 'src/app/auth';

i18next.addResourceBundle('en', 'adminrole', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);
i18next.addResourceBundle('hin', 'adminrole', hin);

const AdminRepairerConfig = {
  settings: {
    layout: {
      config: {},
    },
  },

  auth: authRoles.admin,
  routes: [
    {
      path: 'adminrepairer',
      element: <AdminRepairer />,
    },
  ],
};

export default AdminRepairerConfig;