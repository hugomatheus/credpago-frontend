import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren:  () => import('./modules/auth/auth.module').then((m)=>m.AuthModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'register',
    loadChildren:  () => import('./modules/register/register.module').then((m)=>m.RegisterModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'urls',
    loadChildren:  () => import('./modules/urls/urls.module').then((m)=>m.UrlsModule),
    canLoad: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
