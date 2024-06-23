import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { ProposalCreateContactsComponent } from '../../components/proposal-create-contacts/proposal-create-contacts.component';
import { ProposalCreateFileInputComponent } from '../../components/proposal-create-file-input/proposal-create-file-input.component';
import {
  contactsFormGroup,
  contentFormGroup,
  detailsFormGroup,
  fileFormGroup,
} from '../../components/proposal-create-forms';
import { ProposalCreateKeyInformationComponent } from '../../components/proposal-create-key-information/proposal-create-key-information.component';
import { ProposalCreateSelectsComponent } from '../../components/proposal-create-selects/proposal-create-selects.component';
import { ProposalCreateStepsComponent } from '../../components/proposal-create-steps/proposal-create-steps.component';
import { deleteInCreationProposal } from '../../states/proposal-overview.actions';
import { ProposalState } from '../../states/proposal-overview.state';
import { ProposalCreateDetailsComponent } from './../../components/proposal-create-details/proposal-create-details.component';

@Component({
  selector: 'app-create-dialog',
  standalone: true,
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.scss',
  imports: [
    ProposalCreateFileInputComponent,
    ProposalCreateKeyInformationComponent,
    ProposalCreateContactsComponent,
    ProposalCreateSelectsComponent,
    SharedModule,
    MatDialogModule,
    ProposalCreateStepsComponent,
    ProposalCreateDetailsComponent,
  ],
})
export class CreateDialogComponent {
  @Select(ProposalState.selectedFile)
  selectedFile$!: Observable<FormData>;
  selected = 0;

  fileForm = fileFormGroup;
  contentForm = contentFormGroup;
  detailsForm = detailsFormGroup;
  contactsForm = contactsFormGroup;

  steps = [
    {
      title: 'Upload',
      form: this.fileForm,
    },
    {
      title: 'Inhalt',
      form: this.contentForm,
    },
    {
      title: 'Details',
      form: this.detailsForm,
    },
    {
      title: 'Verantwortliche & Kontaktperson(en)',
      form: this.contactsForm,
    },
    {
      title: 'Übersicht',
    },
  ];

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

  public nextStep(next: boolean): void {
    console.log(next);
    next && (this.selected += 1);
  }
  public previousStep(): void {
    this.selected >= 1 && (this.selected -= 1);
  }

  public goToStep(step: number): void {
    this.selected = step;
  }

  public createProposal() {}
}
