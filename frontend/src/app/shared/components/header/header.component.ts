import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from '../../../proposal/dialogs/create-dialog/create-dialog.component';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);
  public openCreateDialog() {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      height: '800px',
      width: '1200px',
    });

    dialogRef.afterClosed().pipe().subscribe();
  }
}
