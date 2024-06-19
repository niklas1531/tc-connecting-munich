import { Component } from '@angular/core';
import { FrameComponent } from '../../../shared/components/frame/frame.component';

@Component({
  selector: 'app-proposal-overview-page',
  standalone: true,
  templateUrl: './proposal-overview-page.component.html',
  styleUrl: './proposal-overview-page.component.scss',
  imports: [FrameComponent],
})
export class ProposalOverviewPageComponent {}
