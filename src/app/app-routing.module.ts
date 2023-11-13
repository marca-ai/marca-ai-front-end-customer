import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },  {
    path: 'signup',
    loadChildren: () => import('./views/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'recovery-password',
    loadChildren: () => import('./views/recovery-password/recovery-password.module').then( m => m.RecoveryPasswordPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
