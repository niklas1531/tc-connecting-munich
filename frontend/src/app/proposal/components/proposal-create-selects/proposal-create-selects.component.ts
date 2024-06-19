import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProposalAccessibilty } from '../../interfaces/proposal-accessibilty';
import { ProposalType } from '../../interfaces/proposal-type';

@Component({
  selector: 'app-proposal-create-selects',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './proposal-create-selects.component.html',
  styleUrl: './proposal-create-selects.component.scss',
})
export class ProposalCreateSelectsComponent {
  wahlperioden = ['1', '2', '3'];
  selectedWahlperiode = this.wahlperioden[0];

  createdByOptions = ['Peter', 'Omar', 'Stephanie'];
  selectedCreatedBy = this.createdByOptions[1];

  accessibilities = Object.values(ProposalAccessibilty);
  selectedAccessibility = ProposalAccessibilty.PRIVAT;

  types = Object.values(ProposalType);
  selectedType = ProposalType.BA_ANTRAG;
}
