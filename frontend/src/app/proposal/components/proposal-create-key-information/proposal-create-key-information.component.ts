import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';
import { SharedModule } from '../../../shared/shared.module';
import { ProposalCreateKeywordBreakdownsComponent } from '../proposal-create-keyword-breakdowns/proposal-create-keyword-breakdowns.component';
import { ContentFormGroup } from '../proposal-create.types';
@Component({
  selector: 'app-proposal-create-key-information',
  standalone: true,
  templateUrl: './proposal-create-key-information.component.html',
  styleUrl: './proposal-create-key-information.component.scss',
  imports: [
    TextareaComponent,
    InputFieldComponent,
    ProposalCreateKeywordBreakdownsComponent,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class ProposalCreateKeyInformationComponent {
  @Input() contentFormGroup: ContentFormGroup;
}
