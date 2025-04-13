import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'zone-onpush',
    loadComponent: () =>
      import('./pages/zone-onpush/zone-onpush.component').then(
        (c) => c.ZoneOnpushComponent,
      ),
  },
  {
    path: 'zone-default',
    loadComponent: () =>
      import('./pages/zone-default/zone-default.component').then(
        (c) => c.ZoneDefaultComponent,
      ),
  },
  {
    path: 'zone-triggers',
    loadComponent: () =>
      import('./pages/zone-triggers/zone-triggers.component').then(
        (c) => c.ZoneTriggersComponent,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'zone-onpush',
  },
];
