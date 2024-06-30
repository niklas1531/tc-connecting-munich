import { IGlossary } from '../interfaces/glossary';
import { IProposal } from '../interfaces/proposal';

export class getProposals {
  static readonly type = '[] get Glossaries';
}

export class generateSummary {
  static readonly type = '[PDF File] create Proposal';

  constructor(
    public readonly payload: {
      file: FormData;
      fileF: File;
    }
  ) {}
}

export class deleteInCreationProposal {
  static readonly type = '[] Delete in creation proposal';
}

export class createProposal {
  static readonly type = '[Proposal] create Proposal';

  constructor(
    public readonly payload: {
      proposal: IProposal;
      glossaries: IGlossary[];
    }
  ) {}
}

export class clearSelectedProposal {
  static readonly type = '[] clear selected Proposal';
}

export class getProposalById {
  static readonly type = '[id] get proposal by id';

  constructor(
    public readonly payload: {
      proposalId: string;
    }
  ) {}
}


export class setProposals {
  static readonly type = '[Proposals] set Proposals';
  constructor(
    public readonly payload: {
      proposals: IProposal[];
    }
  ) {}
}

export class setSession {
  static readonly type = '[id] set sessionId';

  constructor(
    public readonly payload: {
      sessionId: string;
    }
  ) {}
}