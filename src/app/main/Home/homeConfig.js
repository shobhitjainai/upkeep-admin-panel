import i18next from 'i18next';
import en from '../example/i18n/en';
import tr from '../example/i18n/tr';
import ar from '../example/i18n/ar';
import Home from './Home';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const homeConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'home',
      element: <Home />,
    },
  ],
};

export default homeConfig;