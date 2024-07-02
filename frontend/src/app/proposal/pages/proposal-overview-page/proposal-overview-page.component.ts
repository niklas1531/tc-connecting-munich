import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FrameComponent } from '../../../shared/components/frame/frame.component';
import { FilterService } from '../../../shared/services/filter.service';
import { ProposalOverviewFilterComponent } from '../../components/proposal-overview-filter/proposal-overview-filter.component';
import { ProposalOverviewTableComponent } from '../../components/proposal-overview-table/proposal-overview-table.component';
import { IProposal } from '../../interfaces/proposal';
import { getProposals } from '../../states/proposal-overview.actions';
import { ProposalState } from '../../states/proposal-overview.state';

@Component({
  selector: 'app-proposal-overview-page',
  standalone: true,
  templateUrl: './proposal-overview-page.component.html',
  styleUrl: './proposal-overview-page.component.scss',
  imports: [
    FrameComponent,
    AsyncPipe,
    ProposalOverviewFilterComponent,
    ProposalOverviewTableComponent,
  ],
})
export class ProposalOverviewPageComponent implements OnInit {
  @Select(ProposalState.proposals) proposals$!: Observable<IProposal>;

  constructor(
    private readonly store: Store,
    private filterService: FilterService
  ) {}
  ngOnInit(): void {
    if (!this.filterService.filterState) {
      this.store.dispatch(new getProposals());
    }
  }
}
