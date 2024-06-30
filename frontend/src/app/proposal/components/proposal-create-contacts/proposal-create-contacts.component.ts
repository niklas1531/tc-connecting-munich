import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { SharedModule } from '../../../shared/shared.module';
import { IPerson } from '../../interfaces/person';
import { ContactInputFormGroup } from './proposal-create-contacts.types';

@Component({
  selector: 'app-proposal-create-contacts',
  standalone: true,
  templateUrl: './proposal-create-contacts.component.html',
  styleUrl: './proposal-create-contacts.component.scss',
  imports: [
    InputFieldComponent,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ProposalCreateContactsComponent implements OnInit {
  @Input() contactsFormGroup;
  @Input() editView?: boolean = true;
  responsibleInput: ContactInputFormGroup;
  responsibles: IPerson[] = [];
  ngOnInit(): void {
    if (this.contactsFormGroup && this.contactsFormGroup.get('responsibles')) {
      this.responsibles = this.contactsFormGroup.get('responsibles').value;
    }
  }
  constructor() {
    this.responsibleInput = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
    });
  }

  addResponsible(): void {
    this.responsibles.push({
      firstName: this.responsibleInput.get('firstName').value,
      lastName: this.responsibleInput.get('lastName').value,
      email: this.responsibleInput.get('email').value,
    });
    this.responsibleInput.reset();
  }
  removeResponsible(index: number): void {
    if (index > -1) {
      this.responsibles.splice(index, 1);
    }
  }
}
