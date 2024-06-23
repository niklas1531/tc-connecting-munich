import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../../shared/shared.module';
import { ProposalAccessibilty } from '../../interfaces/proposal-accessibilty';
import { ProposalType } from '../../interfaces/proposal-type';
import { DetailsFormGroup } from '../proposal-create.types';

@Component({
  selector: 'app-proposal-create-details',
  standalone: true,
  templateUrl: './proposal-create-details.component.html',
  styleUrl: './proposal-create-details.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    SharedModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class ProposalCreateDetailsComponent {
  @Input() detailsFormGroup: DetailsFormGroup;

  wahlperioden = ['1', '2', '3'];
  selectedWahlperiode = this.wahlperioden[0];

  createdByOptions = ['Peter', 'Omar', 'Stephanie'];
  selectedCreatedBy = this.createdByOptions[1];

  accessibilities = Object.values(ProposalAccessibilty);
  selectedAccessibility = ProposalAccessibilty.PRIVAT;

  types = Object.values(ProposalType);
  selectedType = ProposalType.BA_ANTRAG;
}
