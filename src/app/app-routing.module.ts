import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './logon/logon.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsersComponent } from './component/users/users.component';
import { AuthGuard } from './shared/auth.guard';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/logon', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[AuthGuard]
      },
      { path: 'logon', component : LoginComponent },
      { path: 'component/users', component : UsersComponent },
      { path: 'registration', component : RegistrationComponent },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  },
];
