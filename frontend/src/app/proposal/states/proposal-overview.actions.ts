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
