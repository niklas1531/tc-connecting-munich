import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { filter, finalize, Observable, take, tap } from 'rxjs';
import { IProposal } from '../interfaces/proposal';
import { ProposalService } from '../services/proposal.service';
import {
  deleteInCreationProposal,
  getProposals,
  uploadProposalFile,
} from './proposal-overview.actions';

export interface ProposalStateModel {
  isLoading: boolean;
  hasError: boolean;
  proposals: IProposal[];
  filteredProposals: IProposal[];
  selectedFile: FormData;
  inCreationProposal: IProposal;
}

@State<ProposalStateModel>({
  name: 'ProposalOverview',
  defaults: {
    isLoading: false,
    hasError: false,
    proposals: [],
    filteredProposals: [],
    selectedFile: undefined,
    inCreationProposal: undefined,
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

  @Selector()
  static filteredProposals(state: ProposalStateModel): IProposal[] {
    return state.filteredProposals;
  }

  @Selector()
  static inCreationProposal(state: ProposalStateModel): IProposal {
    return state.inCreationProposal;
  }

  @Selector()
  static selectedFile(state: ProposalStateModel): FormData {
    return state.selectedFile;
  }

  @Action(uploadProposalFile)
  uploadProposalFile(
    context: StateContext<ProposalStateModel>,
    { payload }: uploadProposalFile
  ): Observable<IProposal> {
    context.patchState({ isLoading: true });
    return this.proposalService.uploadProposalFile(payload.file).pipe(
      take(1),
      filter((response) => !!response),
      tap((response) =>
        context.patchState({
          inCreationProposal: response,
          selectedFile: payload.file,
        })
      ),
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
      tap((proposals) =>
        context.patchState({ proposals, filteredProposals: proposals })
      )
    );
  }

  @Action(deleteInCreationProposal)
  deleteInCreationProposal(context: StateContext<ProposalStateModel>) {
    context.patchState({
      inCreationProposal: undefined,
      selectedFile: undefined,
    });
  }
}

