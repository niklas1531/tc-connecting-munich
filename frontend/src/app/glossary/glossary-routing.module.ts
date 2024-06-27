import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlossaryDetailsPageComponent } from './pages/glossary-details-page/glossary-details-page.component';
import { GlossaryOverviewPageComponent } from './pages/glossary-overview-page/glossary-overview-page.component';

const routes: Routes = [
  {
    path: '',
    component: GlossaryOverviewPageComponent,
  },
  {
    path: 'details/:id',
    component: GlossaryDetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlossaryRoutingModule {}
