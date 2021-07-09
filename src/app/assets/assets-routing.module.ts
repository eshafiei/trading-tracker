import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetsPage } from './assets.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: AssetsPage,
    children: [
      {
        path: 'week',
        children: [
          {
            path: ':weekId',
            loadChildren: () => import('./weekly-summary/weekly-summary.module').then( m => m.WeeklySummaryPageModule)
          }
        ]
      }
    ]
  },
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
    redirectTo: '/assets/tabs/week/1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetsPageRoutingModule {}
