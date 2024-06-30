import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProposalType } from '../../proposal/interfaces/proposal-type';
import { userType } from '../../shared/interfaces/chat';
import { FilterService } from '../../shared/services/filter.service';
import { SharedModule } from '../../shared/shared.module';
import { SearchEngineService } from './../../shared/services/search-engine.service';

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

  constructor(
    private searchEngineService: SearchEngineService,
    private router: Router,
    private filterService: FilterService
  ) {}

  public changeSelectedType(type: ProposalType) {
    this.selectedType = type;
  }

  public startSearch(event: KeyboardEvent): void {
    const input = (event.target as HTMLInputElement).value;

    this.searchEngineService.addChat({
      userType: userType.USER,
      message: input,
      time: new Date().toISOString(),
    });
    this.filterService.setFilterState(true);
    this.router.navigate(['antraege']);
  }
}
