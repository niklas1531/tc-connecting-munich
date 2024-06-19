export class uploadProposalFile {
  static readonly type = '[PDF File] create Proposal';

  constructor(
    public readonly payload: {
      file: FormData;
    }
  ) {}
}

export class getProposals {
  static readonly type = '[] get Proposals';
}
