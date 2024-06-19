import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/uebersicht',
    pathMatch: 'full',
  },
  {
    path: 'uebersicht',
    loadChildren: () =>
      import('./overview/overview.module').then((m) => m.OverviewModule),
  },
  {
    path: 'suche',
    component: SearchComponent,
  },
  {
    path: 'glossar',
    loadChildren: () =>
      import('./glossary/glossary.module').then((m) => m.GlossaryModule),
  },
  {
    path: 'antraege',
    loadChildren: () =>
      import('./proposal/proposal.module').then((m) => m.ProposalModule),
  },
];
