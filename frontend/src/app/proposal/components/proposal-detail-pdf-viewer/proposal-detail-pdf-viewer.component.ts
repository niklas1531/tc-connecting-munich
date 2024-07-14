import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Select } from '@ngxs/store';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Observable } from 'rxjs';
import { IProposal } from '../../interfaces/proposal';
import { ProposalService } from '../../services/proposal.service';
import { ProposalState } from '../../states/proposal-overview.state';
@Component({
  selector: 'app-proposal-detail-pdf-viewer',
  standalone: true,
  imports: [PdfViewerModule],
  templateUrl: './proposal-detail-pdf-viewer.component.html',
  styleUrl: './proposal-detail-pdf-viewer.component.scss',
})
export class ProposalDetailPdfViewerComponent implements OnInit {
  @Select(ProposalState.selectedProposal)
  selectedProposal$!: Observable<IProposal>;
  pdfSrc: any;
  constructor(
    private proposalService: ProposalService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.getProposalFile();
  }

  private getProposalFile(): void {
    this.selectedProposal$.subscribe((proposal) => {
      if (proposal && proposal._id) {
        this.proposalService
          .getProposalFile(proposal._id)
          .subscribe((response) => {
            const fileURL = URL.createObjectURL(response);
            this.pdfSrc = fileURL;
            console.log(this.pdfSrc);
          });
      }
    });
  }
}
