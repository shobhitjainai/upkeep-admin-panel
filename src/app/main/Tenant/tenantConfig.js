import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import hin from './i18n/hin';
import Tenant from './Tenant';


i18next.addResourceBundle('en', 'tenantPage', en);
i18next.addResourceBundle('tr', 'tenantPage', tr);
i18next.addResourceBundle('ar', 'tenantPage', ar);
// i18next.addResourceBundle('ind', 'examplePage', ind);
i18next.addResourceBundle('hin', 'tenantPage', hin);

const tenantConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'tenant',
      element: <Tenant />,
    },
  ],
};

export default tenantConfig;