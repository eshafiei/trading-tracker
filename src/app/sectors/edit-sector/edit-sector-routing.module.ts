import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSectorPage } from './edit-sector.page';

const routes: Routes = [
  {
    path: '',
    component: EditSectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSectorPageRoutingModule {}
