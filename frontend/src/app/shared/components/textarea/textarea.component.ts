import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [SharedModule, MatFormFieldModule, MatInputModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent {
  @Input() label: string;
  @Input() icon?: string;
  @Input() hint?: string;
  @Input() formControlName;
  @Input() formGroup;
}
