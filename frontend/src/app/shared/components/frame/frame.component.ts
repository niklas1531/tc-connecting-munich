import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-frame',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss',
})
export class FrameComponent {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() navigateBack?: string;
}
