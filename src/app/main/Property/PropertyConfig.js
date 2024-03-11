import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import ind from './i18n/ind';
import Property from './Property';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);
i18next.addResourceBundle('ind', 'examplePage', ind);

const PropertyConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'property',
      element: <Property />,
    },
  ],
};

export default PropertyConfig;