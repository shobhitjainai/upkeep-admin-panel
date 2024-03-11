import i18next from 'i18next';
import en from '../example/i18n/en';
import tr from '../example/i18n/tr';
import ar from '../example/i18n/ar';
import Landlord from './Landlord';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const landlordConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'landlord',
      element: <Landlord />,
    },
  ],
};

export default landlordConfig;