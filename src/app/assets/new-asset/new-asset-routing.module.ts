import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAssetPage } from './new-asset.page';

const routes: Routes = [
  {
    path: '',
    component: NewAssetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAssetPageRoutingModule {}
