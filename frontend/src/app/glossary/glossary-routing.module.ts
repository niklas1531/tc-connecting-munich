import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlossaryOverviewPageComponent } from './pages/glossary-overview-page/glossary-overview-page.component';

const routes: Routes = [
  {
    path: '',
    component: GlossaryOverviewPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlossaryRoutingModule {}
