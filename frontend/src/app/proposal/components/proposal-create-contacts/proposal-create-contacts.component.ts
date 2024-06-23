import { Component, Input } from '@angular/core';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';

@Component({
  selector: 'app-proposal-create-contacts',
  standalone: true,
  templateUrl: './proposal-create-contacts.component.html',
  styleUrl: './proposal-create-contacts.component.scss',
  imports: [InputFieldComponent],
})
export class ProposalCreateContactsComponent {
  @Input() contactsFormGroup;
}
