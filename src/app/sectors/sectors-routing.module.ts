import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditSectorComponent } from './containers/edit-sector/edit-sector.component';
import { NewSectorComponent } from './containers/new-sector/new-sector.component';

import { SectorsPage } from './sectors.page';

const routes: Routes = [
  {
    path: '',
    component: SectorsPage
  },
  {
    path: 'new-sector',
    component: NewSectorComponent
  },
  {
    path: 'edit-sector/:sectorId',
    component: EditSectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectorsPageRoutingModule {}
