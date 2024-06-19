import { Component } from '@angular/core';
import { DatePickerComponent } from '../../../shared/components/date-picker/date-picker.component';

@Component({
  selector: 'app-proposal-create-dates',
  standalone: true,
  templateUrl: './proposal-create-dates.component.html',
  styleUrl: './proposal-create-dates.component.scss',
  imports: [DatePickerComponent],
})
export class ProposalCreateDatesComponent {}
