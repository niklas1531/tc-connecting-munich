export class getGlossaries {
  static readonly type = '[] get Glossaries';
}


export class getGlossaryById {
  static readonly type = '[id] get Glossary';

  constructor(
    public readonly payload: {
      glossaryId: string;
    }
  ) {}
}

export class clearSelectedGlossary {
  static readonly type = '[] clear selected glossary';
}
