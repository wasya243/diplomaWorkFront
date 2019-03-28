import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginPageComponent } from './auth-pages/login-page/login-page.component';
import { AccessDeniedComponent } from './common-pages/access-denied/access-denied.component';
import { SignupPageComponent } from './auth-pages/signup-page/signup-page.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'sign-up',
    component: SignupPageComponent
  },
  {
    path: 'admin',
    loadChildren: 'src/app/admin/admin.module#AdminModule'
  },
  {
    path: 'dispatcher',
    loadChildren: 'src/app/dispatcher/dispatcher.module#DispatcherModule'
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
