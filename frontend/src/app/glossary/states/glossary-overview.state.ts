import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { filter, Observable, take, tap } from 'rxjs';
import { IGlossary } from '../../proposal/interfaces/glossary';
import { GlossaryService } from '../services/proposal.service';
import {
  clearSelectedGlossary,
  getGlossaries,
  getGlossaryById,
} from './glossary-overview.actions';

export interface GlossaryStateModel {
  isLoading: boolean;
  hasError: boolean;
  glossaries: IGlossary[];
  filteredGlossaries: IGlossary[];
  selectedGlossary: IGlossary | undefined;
}

@State<GlossaryStateModel>({
  name: 'GlossaryOverview',
  defaults: {
    isLoading: false,
    hasError: false,
    glossaries: [],
    filteredGlossaries: [],
    selectedGlossary: undefined,
  },
})
@Injectable()
export class GlossaryState {
  constructor(private readonly glossaryService: GlossaryService) {}

  @Selector()
  static isLoading(state: GlossaryStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static hasError(state: GlossaryStateModel): boolean {
    return state.hasError;
  }

  @Selector()
  static glossaries(state: GlossaryStateModel): IGlossary[] {
    return state.glossaries;
  }
  @Selector()
  static filteredGlossaries(state: GlossaryStateModel): IGlossary[] {
    return state.filteredGlossaries;
  }
  @Selector()
  static selectedGlossary(state: GlossaryStateModel): IGlossary {
    return state.selectedGlossary;
  }

  @Action(getGlossaries)
  getGlossaries(
    context: StateContext<GlossaryStateModel>
  ): Observable<IGlossary[]> {
    return this.glossaryService.getGlossaries().pipe(
      take(1),
      filter((response) => !!response),
      tap((glossaries) =>
        context.patchState({ glossaries, filteredGlossaries: glossaries })
      )
    );
  }

  @Action(getGlossaryById)
  getGlossaryById(
    context: StateContext<GlossaryStateModel>,
    { payload }: getGlossaryById
  ): Observable<IGlossary> {
    return this.glossaryService.getGlossaryById(payload.glossaryId).pipe(
      take(1),
      filter((response) => !!response),
      tap((selectedGlossary) => context.patchState({ selectedGlossary }))
    );
  }

  @Action(clearSelectedGlossary)
  clearSelectedGlossary(context: StateContext<GlossaryStateModel>) {
    context.patchState({ selectedGlossary: undefined });
  }
}
