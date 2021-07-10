import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetsPage } from './assets.page';

const routes: Routes = [
  {
    path: 'new',
    loadChildren: () => import('./new-asset/new-asset.module').then( m => m.NewAssetPageModule)
  },
  {
    path: 'edit/:assetId',
    loadChildren: () => import('./edit-asset/edit-asset.module').then( m => m.EditAssetPageModule)
  },
  {
    path: '',
    component: AssetsPage,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetsPageRoutingModule {}
