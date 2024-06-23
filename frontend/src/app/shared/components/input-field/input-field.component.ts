import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../shared.module';
@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [SharedModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  @Input() label: string;
  @Input() icon?: string;
  @Input() hint?: string;
  @Input() formControlName;
  @Input() formGroup;
}
