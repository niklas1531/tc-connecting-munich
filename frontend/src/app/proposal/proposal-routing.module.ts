import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProposalDetailPageComponent } from './pages/proposal-detail-page/proposal-detail-page.component';
import { ProposalOverviewPageComponent } from './pages/proposal-overview-page/proposal-overview-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProposalOverviewPageComponent,
  },
  {
    path: 'details/:id',
    component: ProposalDetailPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProposalRoutingModule {}
