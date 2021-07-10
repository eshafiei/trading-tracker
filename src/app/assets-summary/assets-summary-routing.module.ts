import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetsSummaryPage } from './assets-summary.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: AssetsSummaryPage,
    children: [
      {
        path: 'week/:weekId',
        children: [
          {
            path: '',
            loadChildren: () => import('./weekly-summary/weekly-summary.module').then( m => m.WeeklySummaryPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/assets-summary/tabs/week/1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/assets-summary/tabs/week/1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetsSummaryPageRoutingModule {}
