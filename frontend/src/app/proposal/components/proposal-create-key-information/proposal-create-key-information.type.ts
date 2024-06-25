import { FormControl, FormGroup } from '@angular/forms';
import { ProposalAccessibilty } from '../../interfaces/proposal-accessibilty';
import { ProposalType } from '../../interfaces/proposal-type';

export type DetailsFormGroup = FormGroup<{
  createdAt: FormControl<string>;
  registeredAt: FormControl<string>;
  processingDeadline: FormControl<string>;
  processingTime: FormControl<number>;
  createdBy: FormControl<string>;
  art: FormControl<ProposalAccessibilty>;
  type: FormControl<ProposalType>;
}>;
