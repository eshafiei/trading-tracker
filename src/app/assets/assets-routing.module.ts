import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetsPage } from './assets.page';

const routes: Routes = [
  {
    path: '',
    component: AssetsPage
  },
  {
    path: 'new-asset',
    loadChildren: () => import('./new-asset/new-asset.module').then( m => m.NewAssetPageModule)
  },
  {
    path: 'edit-asset',
    loadChildren: () => import('./edit-asset/edit-asset.module').then( m => m.EditAssetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetsPageRoutingModule {}
