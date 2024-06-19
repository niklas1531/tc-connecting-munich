import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-frame',
  standalone: true,
  imports: [],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss',
})
export class FrameComponent {
  @Input() title: string;
  @Input() subTitle: string;
}
