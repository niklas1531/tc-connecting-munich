import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-proposal-create-keyword-breakdowns',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './proposal-create-keyword-breakdowns.component.html',
  styleUrl: './proposal-create-keyword-breakdowns.component.scss',
})
export class ProposalCreateKeywordBreakdownsComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  glossaryCtrl = new FormControl('');
  filteredGlossaries: Observable<string[]>;
  glossaries: string[] = ['Ampel'];
  allGlossaries: string[] = [
    'Baumfällung',
    'Radweg',
    'Lichtschaltanlage',
    'Parkplatz',
    'Krankenhaus',
  ];

  @ViewChild('glossaryInput') glossaryInput: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor() {
    this.filteredGlossaries = this.glossaryCtrl.valueChanges.pipe(
      startWith(null),
      map((glossary: string | null) =>
        glossary ? this._filter(glossary) : this.allGlossaries.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.glossaries.push(value);
    }

    event.chipInput!.clear();

    this.glossaryCtrl.setValue(null);
  }

  remove(glossary: string): void {
    const index = this.glossaries.indexOf(glossary);

    if (index >= 0) {
      this.glossaries.splice(index, 1);

      this.announcer.announce(`Removed ${glossary}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.glossaries.push(event.option.viewValue);
    this.glossaryInput.nativeElement.value = '';
    this.glossaryCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGlossaries.filter((glossary) =>
      glossary.toLowerCase().includes(filterValue)
    );
  }
}
