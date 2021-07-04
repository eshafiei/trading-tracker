import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/containers/login/login.component';
import { RegisterComponent } from './auth/containers/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sectors',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'assets',
    loadChildren: () => import('./assets/assets.module').then( m => m.AssetsPageModule)
  },
  {
    path: 'sectors',
    loadChildren: () => import('./sectors/sectors.module').then( m => m.SectorsPageModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
