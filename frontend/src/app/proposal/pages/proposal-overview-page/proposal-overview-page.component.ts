import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Select, Store } from '@ngxs/store';
import { finalize, Observable, take, tap } from 'rxjs';
import { FrameComponent } from '../../../shared/components/frame/frame.component';
import { FilterService } from '../../../shared/services/filter.service';
import { ProposalOverviewFilterComponent } from '../../components/proposal-overview-filter/proposal-overview-filter.component';
import { ProposalOverviewTableComponent } from '../../components/proposal-overview-table/proposal-overview-table.component';
import { IProposal } from '../../interfaces/proposal';
import { ProposalService } from '../../services/proposal.service';
import {
  getProposals,
  setProposals,
} from '../../states/proposal-overview.actions';
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
    MatProgressSpinnerModule,
  ],
})
export class ProposalOverviewPageComponent implements OnInit {
  @Select(ProposalState.proposals) proposals$!: Observable<IProposal>;
  public loading = false;

  constructor(
    private readonly store: Store,
    private filterService: FilterService,
    private proposalService: ProposalService
  ) {}
  ngOnInit(): void {
    if (!this.filterService.filterState) {
      this.store.dispatch(new getProposals());
    }
  }

  public autoGenerateInformation() {
    this.loading = true;
    this.proposalService
      .generateInformationForAllProposals()
      .pipe(
        take(1),
        tap((proposals) =>
          this.store.dispatch(new setProposals({ proposals }))
        ),
        finalize(() => (this.loading = false))
      )
      .subscribe();
  }
}
