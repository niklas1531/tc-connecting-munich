import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type ContactFormGroup = FormGroup<{
  responsibles: FormArray<ContactInputFormGroup>;
  contacts: FormArray<ContactInputFormGroup>;
}>;

export type ContactInputFormGroup = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
}>;
