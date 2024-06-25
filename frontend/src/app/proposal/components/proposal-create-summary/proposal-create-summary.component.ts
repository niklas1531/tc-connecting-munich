import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { ProposalState } from '../../states/proposal-overview.state';
import { ProposalCreateContactsComponent } from '../proposal-create-contacts/proposal-create-contacts.component';
import { ProposalCreateDetailsComponent } from '../proposal-create-details/proposal-create-details.component';
import { ProposalCreateFileInputComponent } from '../proposal-create-file-input/proposal-create-file-input.component';
import { ProposalCreateKeyInformationComponent } from '../proposal-create-key-information/proposal-create-key-information.component';
import { ProposalCreateStepsComponent } from '../proposal-create-steps/proposal-create-steps.component';

@Component({
  selector: 'app-proposal-create-summary',
  standalone: true,
  imports: [
    ProposalCreateFileInputComponent,
    ProposalCreateKeyInformationComponent,
    ProposalCreateContactsComponent,
    SharedModule,
    MatDialogModule,
    ProposalCreateStepsComponent,
    ProposalCreateDetailsComponent,
  ],
  templateUrl: './proposal-create-summary.component.html',
  styleUrl: './proposal-create-summary.component.scss',
})
export class ProposalCreateSummaryComponent {
  @Select(ProposalState.selectedFile)
  selectedFile$!: Observable<FormData>;
  @Input() contentForm;
  @Input() detailsForm;
  @Input() contactsForm;
  @Input() fileForm;
  @Output() moveToStep: EventEmitter<number> = new EventEmitter<number>();
  @Input() selected: number;

  public toStep(step: number): void {
    this.moveToStep.next(step);
  }
}
