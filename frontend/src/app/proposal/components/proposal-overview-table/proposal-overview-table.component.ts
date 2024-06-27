import { AsyncPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { IProposal } from '../../interfaces/proposal';
import { ProposalState } from '../../states/proposal-overview.state';

@Component({
  selector: 'app-proposal-overview-table',
  standalone: true,
  imports: [AsyncPipe, SharedModule],
  templateUrl: './proposal-overview-table.component.html',
  styleUrl: './proposal-overview-table.component.scss',
})
export class ProposalOverviewTableComponent {
  @Select(ProposalState.proposals) proposals$!: Observable<IProposal>;
  public expanded: IProposal | undefined | null;
  columnsToDisplay = ['title', 'severity', 'priority', 'category', 'source'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  totalRecords: number = 0;
  dataSource: any;
  pageSizeOptions: number[] = [10, 20, 30];
  pageEvent!: PageEvent;

  constructor(private router: Router) {}

  public navigateToDetails(event: Event, proposalId: string): void {
    event.stopPropagation();
    this.router.navigate(['antraege/details', proposalId]);
  }
}
