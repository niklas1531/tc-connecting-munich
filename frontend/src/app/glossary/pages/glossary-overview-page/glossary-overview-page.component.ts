import { Component } from '@angular/core';
import { FrameComponent } from '../../../shared/components/frame/frame.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { GlossaryListComponent } from '../../components/glossary-list/glossary-list.component';

@Component({
  selector: 'app-glossary-overview-page',
  standalone: true,
  templateUrl: './glossary-overview-page.component.html',
  styleUrl: './glossary-overview-page.component.scss',
  imports: [FrameComponent, GlossaryListComponent, InputFieldComponent],
})
export class GlossaryOverviewPageComponent {}
