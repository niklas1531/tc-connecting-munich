import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';
import { ProposalCreateKeywordBreakdownsComponent } from '../proposal-create-keyword-breakdowns/proposal-create-keyword-breakdowns.component';
@Component({
  selector: 'app-proposal-create-key-information',
  standalone: true,
  templateUrl: './proposal-create-key-information.component.html',
  styleUrl: './proposal-create-key-information.component.scss',
  imports: [
    TextareaComponent,
    InputFieldComponent,
    ProposalCreateKeywordBreakdownsComponent,
  ],
})
export class ProposalCreateKeyInformationComponent {}
