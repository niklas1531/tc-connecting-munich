import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProposalOverviewPageComponent } from './pages/proposal-overview-page/proposal-overview-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProposalOverviewPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProposalRoutingModule {}
