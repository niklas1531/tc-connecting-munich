import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IGlossary } from '../../../proposal/interfaces/glossary';
import { FrameComponent } from '../../../shared/components/frame/frame.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { GLOSSARY_NAVIGATION_ITEMS } from '../../components/glossary-list-navigation/glossary-list-navigation.data';
import { GlossaryListComponent } from '../../components/glossary-list/glossary-list.component';
import { getGlossaries } from '../../states/glossary-overview.actions';
import { GlossaryState } from '../../states/glossary-overview.state';

@Component({
  selector: 'app-glossary-overview-page',
  standalone: true,
  templateUrl: './glossary-overview-page.component.html',
  styleUrl: './glossary-overview-page.component.scss',
  imports: [
    FrameComponent,
    GlossaryListComponent,
    InputFieldComponent,
    AsyncPipe,
  ],
})
export class GlossaryOverviewPageComponent implements OnInit {
  ngOnInit(): void {
    this.loadGlossaries();
  }
  @Select(GlossaryState.glossaries) glossaries$: Observable<IGlossary>;

  constructor(private store: Store) {}

  public loadGlossaries() {
    this.store.dispatch(new getGlossaries());
  }
  public toCharacterSortedGlossaryEntries(glossaries: IGlossary[]) {
    return GLOSSARY_NAVIGATION_ITEMS.map((character) => ({
      character,
      entries: glossaries.filter((entry) =>
        entry.title.toUpperCase().startsWith(character)
      ),
    })).filter((array) => array.entries.length > 0);
  }
}
