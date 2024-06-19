import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { ProposalCreateContactsComponent } from '../../components/proposal-create-contacts/proposal-create-contacts.component';
import { ProposalCreateDatesComponent } from '../../components/proposal-create-dates/proposal-create-dates.component';
import { ProposalCreateFileInputComponent } from '../../components/proposal-create-file-input/proposal-create-file-input.component';
import { ProposalCreateKeyInformationComponent } from '../../components/proposal-create-key-information/proposal-create-key-information.component';
import { ProposalCreateSelectsComponent } from '../../components/proposal-create-selects/proposal-create-selects.component';
import { deleteInCreationProposal } from '../../states/proposal-overview.actions';
import { ProposalState } from '../../states/proposal-overview.state';

@Component({
  selector: 'app-create-dialog',
  standalone: true,
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.scss',
  imports: [
    ProposalCreateFileInputComponent,
    ProposalCreateKeyInformationComponent,
    ProposalCreateContactsComponent,
    ProposalCreateDatesComponent,
    ProposalCreateSelectsComponent,
    SharedModule,
    MatDialogModule,
  ],
})
export class CreateDialogComponent {
  @Select(ProposalState.selectedFile)
  selectedFile$!: Observable<FormData>;

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>, // @Inject(MAT_DIALOG_DATA) public data: ..
    private readonly store: Store
  ) {}
  public closeDialog(): void {
    this.dialogRef.close();
  }

  public deleteInCreationProposal(): void {
    this.store.dispatch(new deleteInCreationProposal());
  }
}
