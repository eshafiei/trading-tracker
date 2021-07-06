import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/containers/login/login.component';
import { RegisterComponent } from './auth/containers/register/register.component';
import { AuthGuardService as AuthGuard } from './auth/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sectors',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
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
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
