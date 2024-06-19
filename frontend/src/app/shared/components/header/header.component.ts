import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateDialogComponent } from '../../../proposal/dialogs/create-dialog/create-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);
  public openCreateDialog() {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      height: '600px',
      width: '1000px',
    });

    dialogRef.afterClosed().pipe().subscribe();
  }
}
