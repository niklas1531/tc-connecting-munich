import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { finalize, Observable, take, tap } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { IProposal } from '../../interfaces/proposal';
import { ProposalService } from '../../services/proposal.service';
import { ProposalState } from '../../states/proposal-overview.state';
@Component({
  selector: 'app-proposal-detail-pdf-viewer',
  standalone: true,
  imports: [PdfViewerModule, SharedModule],
  templateUrl: './proposal-detail-pdf-viewer.component.html',
  styleUrl: './proposal-detail-pdf-viewer.component.scss',
})
export class ProposalDetailPdfViewerComponent implements OnInit {
  @Select(ProposalState.selectedProposal)
  selectedProposal$!: Observable<IProposal>;
  pdfSrc: any;
  public loading = false;
  constructor(private proposalService: ProposalService) {}
  ngOnInit(): void {
    this.getProposalFile();
  }

  private getProposalFile(): void {
    this.loading = true;
    this.selectedProposal$.subscribe((proposal) => {
      if (proposal && proposal._id) {
        this.proposalService
          .getProposalFile(proposal._id)
          .pipe(
            take(1),
            tap((response) => {
              const fileURL = URL.createObjectURL(response);
              this.pdfSrc = fileURL;
            }),
            finalize(() => (this.loading = false))
          )
          .subscribe();
      }
    });
  }
}
