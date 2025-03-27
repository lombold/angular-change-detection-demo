import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'zone-onpush',
    loadComponent: () => import('./pages/zone-onpush/zone-onpush.component').then((c) => c.ZoneOnpushComponent)
  },
  {
    path: 'zone-default',
    loadComponent: () => import('./pages/zone-default/zone-default.component').then((c) => c.ZoneDefaultComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'zone-onpush',
  }
];
