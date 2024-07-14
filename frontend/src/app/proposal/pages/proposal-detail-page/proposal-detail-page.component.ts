import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { finalize, Observable, switchMap, take } from 'rxjs';
import { FrameComponent } from '../../../shared/components/frame/frame.component';
import { SharedModule } from '../../../shared/shared.module';
import { ProposalDetailPdfViewerComponent } from '../../components/proposal-detail-pdf-viewer/proposal-detail-pdf-viewer.component';
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
  imports: [
    FrameComponent,
    AsyncPipe,
    ProposalDetailPdfViewerComponent,
    SharedModule,
  ],
})
export class ProposalDetailPageComponent implements OnInit, OnDestroy {
  @Select(ProposalState.selectedProposal)
  selectedProposal$!: Observable<IProposal>;
  public loading = false;
  constructor(private route: ActivatedRoute, private store: Store) {}
  ngOnDestroy(): void {
    this.store.dispatch(new clearSelectedProposal());
  }
  ngOnInit(): void {
    this.loadProposal();
  }

  private loadProposal() {
    (this.loading = true),
      this.route.paramMap
        .pipe(
          take(1),
          switchMap((params) =>
            this.store.dispatch(
              new getProposalById({ proposalId: params.get('id') })
            )
          ),
          finalize(() => (this.loading = false))
        )
        .subscribe();
  }
}
