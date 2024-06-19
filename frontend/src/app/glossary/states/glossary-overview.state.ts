import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { filter, Observable, take, tap } from 'rxjs';
import { IGlossary } from '../../proposal/interfaces/glossary';
import { GlossaryService } from '../services/proposal.service';
import { getGlossaries } from './../../proposal/states/proposal-overview.actions';

export interface GlossaryStateModel {
  isLoading: boolean;
  hasError: boolean;
  glossaries: IGlossary[];
}

@State<GlossaryStateModel>({
  name: 'GlossaryOverview',
  defaults: {
    isLoading: false,
    hasError: false,
    glossaries: [],
  },
})
@Injectable()
export class ProposalState {
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

  @Action(getGlossaries)
  getGlossaries(
    context: StateContext<GlossaryStateModel>
  ): Observable<IGlossary[]> {
    return this.glossaryService.getGlossaries().pipe(
      take(1),
      filter((response) => !!response),
      tap((glossaries) => context.patchState({ glossaries }))
    );
  }
}
