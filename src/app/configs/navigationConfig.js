import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import ind from './navigation-i18n/ind';
import hin from './navigation-i18n/hin';


i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
i18next.addResourceBundle('ind', 'navigation', ind);
i18next.addResourceBundle('hin', 'navigation', hin);




const navigationConfig = [
  
  {
    id: 'Home',
    title: 'Home',
    translate: 'Home',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: 'home',
  },
  {
    id: 'adminLandlord',
    title: 'Landlords',
    translate: 'Landlord',
    type: 'item',
    icon: 'heroicons-outline:user',
    url: 'adminlandlord',
  },
  {
    id: 'adminTenant',
    title: 'Tenants',
    translate: 'Tenant',
    type: 'item',
    icon: 'heroicons-outline:user-circle',
    url: 'admintenant',
  },
  {
    id: 'adminProperty',
    title: 'Property',
    translate: 'Property',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: 'adminproperty',
  },
  {
    id: 'adminRepairer',
    title: 'Repairer',
    translate: 'Repairer',
    type: 'item',
    icon: 'heroicons-outline:user-circle',
    url: 'adminrepairer',
  },
  {
    id: 'Notification',
    title: 'Notification',
    translate: 'Notification',
    type: 'item',
    icon: 'heroicons-outline:bell',
    url: 'notification',
  },
  // {
  //   id: 'termsnconditions',
  //   title: `terms n conditions`,
  //   translate: 'terms_n_conditions',
  //   type: 'item',
  //   icon: 'heroicons-outline:home',
  //   url: 'repairer',
  // },
];


export default navigationConfig;
