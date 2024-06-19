import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProposalCreateFileInputComponent } from '../../components/proposal-create-file-input/proposal-create-file-input.component';

@Component({
  selector: 'app-create-dialog',
  standalone: true,
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.scss',
  imports: [ProposalCreateFileInputComponent],
})
export class CreateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent> // @Inject(MAT_DIALOG_DATA) public data: ..
  ) {}
  closeDialog(): void {
    this.dialogRef.close();
  }
}
