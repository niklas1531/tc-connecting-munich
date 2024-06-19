import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FrameComponent } from '../../../shared/components/frame/frame.component';
import { IProposal } from '../../interfaces/proposal';
import { getProposals } from '../../states/proposal-overview.actions';
import { ProposalState } from '../../states/proposal-overview.state';

@Component({
  selector: 'app-proposal-overview-page',
  standalone: true,
  templateUrl: './proposal-overview-page.component.html',
  styleUrl: './proposal-overview-page.component.scss',
  imports: [FrameComponent, AsyncPipe],
})
export class ProposalOverviewPageComponent implements OnInit {
  @Select(ProposalState.proposals) proposals$!: Observable<IProposal>;

  constructor(private readonly store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(new getProposals());
  }
}
