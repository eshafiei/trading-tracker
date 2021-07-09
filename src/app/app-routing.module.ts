import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundPage } from './site/not-found/not-found.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'assets',
    pathMatch: 'full'
  },
  {
    path: 'assets',
    loadChildren: () => import('./assets/assets.module').then( m => m.AssetsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sectors',
    loadChildren: () => import('./sectors/sectors.module').then( m => m.SectorsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '**',
    component: NotFoundPage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
