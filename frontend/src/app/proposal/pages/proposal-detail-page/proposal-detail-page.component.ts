import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, switchMap, take } from 'rxjs';
import { FrameComponent } from '../../../shared/components/frame/frame.component';
import { IProposal } from '../../interfaces/proposal';
import {
  clearSelectedProposal,
  getProposalById,
} from '../../states/proposal-overview.actions';
import { ProposalState } from '../../states/proposal-overview.state';

@Component({
  selector: 'app-proposal-detail-page',
  standalone: true,
  templateUrl: './proposal-detail-page.component.html',
  styleUrl: './proposal-detail-page.component.scss',
  imports: [FrameComponent, AsyncPipe],
})
export class ProposalDetailPageComponent implements OnInit, OnDestroy {
  @Select(ProposalState.selectedProposal)
  selectedProposal$!: Observable<IProposal>;
  constructor(private route: ActivatedRoute, private store: Store) {}
  ngOnDestroy(): void {
    this.store.dispatch(new clearSelectedProposal());
  }
  ngOnInit(): void {
    this.loadProposal();
  }

  private loadProposal() {
    this.route.paramMap
      .pipe(
        take(1),
        switchMap((params) =>
          this.store.dispatch(
            new getProposalById({ proposalId: params.get('id') })
          )
        )
      )
      .subscribe();
  }
}
