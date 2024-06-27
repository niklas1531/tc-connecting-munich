import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export const fileFormGroup = new FormGroup({
  file: new FormControl(undefined, Validators.required),
});
export const contentFormGroup = new FormGroup({
  title: new FormControl('', Validators.required),
  summary: new FormControl('', Validators.required),
  glossaries: new FormControl([], Validators.required),
});

export const detailsFormGroup = new FormGroup({
  createdAt: new FormControl('', Validators.required),
  registeredAt: new FormControl('', Validators.required),
  processingDeadline: new FormControl('', Validators.required),
  processingTime: new FormControl('', Validators.required),
  createdBy: new FormControl('', Validators.required),
  responsibleDepartment: new FormControl('', Validators.required),
  art: new FormControl(undefined, Validators.required),
  type: new FormControl(undefined, Validators.required),
  electionPeriod: new FormControl('', Validators.required),
});

export const contactsFormGroup = new FormGroup({
  responsibles: new FormArray([], Validators.required),
  contacts: new FormArray([]),
});
