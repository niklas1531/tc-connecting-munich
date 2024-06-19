import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { SharedModule } from '../../../shared/shared.module';
import { ProposalCreateFileInputComponent } from '../../components/proposal-create-file-input/proposal-create-file-input.component';
import { ProposalCreateKeyInformationComponent } from '../../components/proposal-create-key-information/proposal-create-key-information.component';

@Component({
  selector: 'app-create-dialog',
  standalone: true,
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.scss',
  imports: [
    ProposalCreateFileInputComponent,
    ProposalCreateKeyInformationComponent,
    SharedModule,
    MatDialogModule,
  ],
})
export class CreateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>, // @Inject(MAT_DIALOG_DATA) public data: ..
    private readonly store: Store
  ) {}
  public closeDialog(): void {
    this.dialogRef.close();
  }
}
