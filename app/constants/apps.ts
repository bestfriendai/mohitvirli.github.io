import { MobileApp } from "../types/apps";

export const MOBILE_APPS: MobileApp[] = [
  {
    name: 'App One',
    description: 'Your amazing app description goes here',
    icon: '/icons/app1.svg',
    appStoreUrl: 'https://apps.apple.com/your-app',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=your.app',
    color: '#4F46E5',
  },
  {
    name: 'App Two',
    description: 'Another great app description',
    icon: '/icons/app2.svg',
    appStoreUrl: 'https://apps.apple.com/your-app-2',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=your.app2',
    color: '#EC4899',
  },
  // Add more apps as needed
];
