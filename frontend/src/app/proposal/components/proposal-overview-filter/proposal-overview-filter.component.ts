import { Component } from '@angular/core';

@Component({
  selector: 'app-proposal-overview-filter',
  standalone: true,
  imports: [],
  templateUrl: './proposal-overview-filter.component.html',
  styleUrl: './proposal-overview-filter.component.scss',
})
export class ProposalOverviewFilterComponent {
  public activeFilter = false;
}
