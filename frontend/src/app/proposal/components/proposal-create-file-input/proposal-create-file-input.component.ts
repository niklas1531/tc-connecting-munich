import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SharedModule } from '../../../shared/shared.module';
import { uploadProposalFile } from '../../states/proposal-overview.actions';

@Component({
  selector: 'app-proposal-create-file-input',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './proposal-create-file-input.component.html',
  styleUrl: './proposal-create-file-input.component.scss',
})
export class ProposalCreateFileInputComponent {
  constructor(private readonly store: Store) {}

  public uploadProposalFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      this.store
        .dispatch(new uploadProposalFile({ file: formData }))
        .subscribe();
    }
  }
}
