import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { SharedModule } from '../../../shared/shared.module';
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
  contactInput: ContactInputFormGroup;
  ngOnInit(): void {}
  constructor() {
    this.responsibleInput = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
    });
    this.contactInput = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
    });
  }
  public get responsiblesFormArray(): FormArray<ContactInputFormGroup> {
    return this.contactsFormGroup.get(
      'responsibles'
    ) as FormArray<ContactInputFormGroup>;
  }
  public get contactsFormArray(): FormArray<any> {
    return this.contactsFormGroup.get(
      'contacts'
    ) as FormArray<ContactInputFormGroup>;
  }

  addResponsible(): void {
    this.responsiblesFormArray.push(
      new FormGroup({
        firstName: new FormControl<string>(
          this.responsibleInput.get('firstName').value
        ),
        lastName: new FormControl<string>(
          this.responsibleInput.get('lastName').value
        ),
        email: new FormControl<string>(
          this.responsibleInput.get('email').value
        ),
      })
    );
    this.responsibleInput.reset();
  }

  addContact(): void {
    this.contactsFormArray.push(
      new FormGroup({
        firstName: new FormControl<string>(
          this.contactInput.get('firstName').value
        ),
        lastName: new FormControl<string>(
          this.contactInput.get('lastName').value
        ),
        email: new FormControl<string>(this.contactInput.get('email').value),
      })
    );
    this.contactInput.reset();
  }
}
