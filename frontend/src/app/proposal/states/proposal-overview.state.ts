import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { filter, finalize, Observable, take, tap } from 'rxjs';
import { IProposal } from '../interfaces/proposal';
import { ProposalService } from '../services/proposal.service';
import { getProposals, uploadProposalFile } from './proposal-overview.actions';

export interface ProposalStateModel {
  isLoading: boolean;
  hasError: boolean;
  proposals: IProposal[];
  selectedFile: FormData;
}

@State<ProposalStateModel>({
  name: 'ProposalOverview',
  defaults: {
    isLoading: false,
    hasError: false,
    proposals: [],
    selectedFile: undefined,
  },
})
@Injectable()
export class ProposalState {
  constructor(private readonly proposalService: ProposalService) {}

  @Selector()
  static isLoading(state: ProposalStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static hasError(state: ProposalStateModel): boolean {
    return state.hasError;
  }

  @Selector()
  static proposals(state: ProposalStateModel): IProposal[] {
    return state.proposals;
  }

  @Action(uploadProposalFile)
  uploadProposalFile(
    context: StateContext<ProposalStateModel>,
    { payload }: uploadProposalFile
  ): Observable<IProposal> {
    return this.proposalService.uploadProposalFile(payload.file).pipe(
      //TODO Handle response
      tap((response) => console.log(response)),
      finalize(() => void context.patchState({ isLoading: false }))
    );
  }

  @Action(getProposals)
  getProposals(
    context: StateContext<ProposalStateModel>
  ): Observable<IProposal[]> {
    return this.proposalService.getProposals().pipe(
      take(1),
      filter((response) => !!response),
      tap((proposals) => context.patchState({ proposals }))
    );
  }
}
