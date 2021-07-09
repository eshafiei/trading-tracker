import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeeklySummaryPage } from './weekly-summary.page';

const routes: Routes = [
  {
    path: '',
    component: WeeklySummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeeklySummaryPageRoutingModule {}
