import { Component, OnInit } from '@angular/core';
import { ProposalService } from '../../../proposal/services/proposal.service';
import { FrameComponent } from '../../../shared/components/frame/frame.component';

@Component({
  selector: 'app-glossary-details-page',
  standalone: true,
  templateUrl: './glossary-details-page.component.html',
  styleUrl: './glossary-details-page.component.scss',
  imports: [FrameComponent],
})
export class GlossaryDetailsPageComponent implements OnInit {
  constructor(private proposalService: ProposalService) {}
  ngOnInit(): void {}

  private loadProposal() {
    // this.proposalService.getProposalById();
  }
}
