import { Component, ElementRef, ViewChild } from '@angular/core';
import { userType } from '../../../shared/interfaces/chat';
import { FilterService } from '../../../shared/services/filter.service';
import { SearchEngineService } from '../../../shared/services/search-engine.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-proposal-overview-filter',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './proposal-overview-filter.component.html',
  styleUrl: './proposal-overview-filter.component.scss',
})
export class ProposalOverviewFilterComponent {
  constructor(
    protected filterService: FilterService,
    protected searchEngineService: SearchEngineService
  ) {}
  public userType = userType;
  @ViewChild('messageInput') messageInput: ElementRef<HTMLTextAreaElement>;

  public addMessage() {
    const input = this.messageInput.nativeElement.value;

    this.searchEngineService.addChat({
      userType: userType.USER,
      message: input,
      time: new Date().toISOString(),
    });
    this.messageInput.nativeElement.value = '';
  }
}
