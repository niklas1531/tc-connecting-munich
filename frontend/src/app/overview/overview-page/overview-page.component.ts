import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProposalType } from '../../proposal/interfaces/proposal-type';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-overview-page',
  standalone: true,
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.scss',
  imports: [SharedModule],
})
export class OverviewPageComponent {
  currentSearchValue: string | undefined;
  antraege = new FormControl('');
  selectedType = ProposalType.STR_ANTRAG;

  antragsOptions: string[] = Object.values(ProposalType);

  public changeSelectedType(type: ProposalType) {
    this.selectedType = type;
  }
}
