import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import ind from './navigation-i18n/ind';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
i18next.addResourceBundle('ind', 'navigation', ind);

const navigationConfig = [
  // {
  //   id: 'example-component',
  //   title: 'Example',
  //   translate: 'EXAMPLE',
  //   type: 'item',
  //   icon: 'heroicons-outline:star',
  //   url: 'example',
  // },
  {
    id: 'Home',
    title: 'Home',
    translate: 'Home',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: 'home',
  },
  {
    id: 'Landlord',
    title: 'Landlord',
    translate: 'Landlord',
    type: 'item',
    icon: 'heroicons-outline:user',
    url: 'landlord',
  },
  {
    id: 'Tenant',
    title: 'Tenant',
    translate: 'Tenant',
    type: 'item',
    icon: 'heroicons-outline:user-circle',
    url: 'tenant',
  },
  {
    id: 'Property',
    title: 'Property',
    translate: 'Property',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: 'property',
  },
];

export default navigationConfig;
