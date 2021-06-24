import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAssetPage } from './edit-asset.page';

const routes: Routes = [
  {
    path: '',
    component: EditAssetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAssetPageRoutingModule {}
