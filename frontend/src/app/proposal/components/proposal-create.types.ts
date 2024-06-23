import { FormControl, FormGroup } from '@angular/forms';
import { ProposalAccessibilty } from '../interfaces/proposal-accessibilty';
import { ProposalType } from '../interfaces/proposal-type';

export type DetailsFormGroup = FormGroup<{
  createdAt: FormControl<string>;
  registeredAt: FormControl<string>;
  processingDeadline: FormControl<string>;
  processingTime: FormControl<number>;
  electionPeriod: FormControl<string>;
  createdBy: FormControl<string>;
  art: FormControl<ProposalAccessibilty>;
  type: FormControl<ProposalType>;
}>;

export type ContentFormGroup = FormGroup<{
  title: FormControl<string>;
  summary: FormControl<string>;
  glossaries: FormControl<string[]>;
}>;
