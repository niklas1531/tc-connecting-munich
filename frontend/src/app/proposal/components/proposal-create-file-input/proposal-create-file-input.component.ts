import { Component } from '@angular/core';

@Component({
  selector: 'app-proposal-create-file-input',
  standalone: true,
  imports: [],
  templateUrl: './proposal-create-file-input.component.html',
  styleUrl: './proposal-create-file-input.component.scss',
})
export class ProposalCreateFileInputComponent {
  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
    }
  }
}
