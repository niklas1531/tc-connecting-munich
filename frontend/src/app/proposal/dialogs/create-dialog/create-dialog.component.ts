import { Component, OnDestroy } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, take, tap } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { ProposalCreateContactsComponent } from '../../components/proposal-create-contacts/proposal-create-contacts.component';
import { ProposalCreateDetailsComponent } from '../../components/proposal-create-details/proposal-create-details.component';
import { ProposalCreateFileInputComponent } from '../../components/proposal-create-file-input/proposal-create-file-input.component';
import {
  contactsFormGroup,
  contentFormGroup,
  detailsFormGroup,
  fileFormGroup,
} from '../../components/proposal-create-forms';
import { ProposalCreateKeyInformationComponent } from '../../components/proposal-create-key-information/proposal-create-key-information.component';
import { ProposalCreateStepsComponent } from '../../components/proposal-create-steps/proposal-create-steps.component';
import { ProposalCreateSummaryComponent } from '../../components/proposal-create-summary/proposal-create-summary.component';
import { IProposal } from '../../interfaces/proposal';
import {
  createProposal,
  deleteInCreationProposal,
} from '../../states/proposal-overview.actions';
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
    SharedModule,
    MatDialogModule,
    ProposalCreateStepsComponent,
    ProposalCreateDetailsComponent,
    ProposalCreateSummaryComponent,
  ],
})
export class CreateDialogComponent implements OnDestroy {
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
    private readonly store: Store,
    private toastr: ToastrService
  ) {}
  ngOnDestroy(): void {
    this.store.dispatch(new deleteInCreationProposal());
    this.clearForms();
  }

  private clearForms(): void {
    this.fileForm.reset();
    this.contactsForm.reset();
    this.contentForm.reset();
    this.detailsForm.reset();
  }
  public closeDialog(): void {
    this.dialogRef.close();
  }

  public deleteInCreationProposal(): void {
    this.store.dispatch(new deleteInCreationProposal());
  }

  public nextStep(next: boolean): void {
    next && (this.selected += 1);
  }
  public previousStep(): void {
    this.selected >= 1 && (this.selected -= 1);
  }

  public goToStep(step: number): void {
    this.selected = step;
  }

  public createProposal() {
    const { title, summary, glossaries } = this.contentForm.value;
    const { responsibles, contacts } = this.contactsForm.value;
    const {
      createdAt,
      registeredAt,
      processingDeadline,
      createdBy,
      art,
      type,
      electionPeriod,
      responsibleDepartment,
    } = this.detailsForm.value;
    const newProposal: IProposal = {
      title,
      summary,
      glossaries,
      responsibles,
      contacts,
      createdAt,
      registeredAt,
      createdBy,
      electionPeriod,
      type,
      responsibleDepartment,
      deadline: processingDeadline,
      accessibility: art,
    };
    this.store
      .dispatch(new createProposal({ proposal: newProposal, glossaries }))
      .pipe(
        take(1),
        tap(
          () => (
            this.toastr.success('Antrag wurde erfolgreich erstellt'),
            this.closeDialog()
          )
        )
      )
      .subscribe();
  }
}
