import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import hin from './i18n/hin';
import Home from './Home'
import { authRoles } from 'src/app/auth';

i18next.addResourceBundle('en', 'homePage', en);
i18next.addResourceBundle('tr', 'homePage', tr);
i18next.addResourceBundle('ar', 'homePage', ar);

i18next.addResourceBundle('hin', 'homePage', hin);


const homeConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'home',
      element: <Home />,
    },
  ],
};

export default homeConfig;