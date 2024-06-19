import { IGlossary } from './glossary';
import { IPerson } from './person';
import { ProposalAccessibilty } from './proposal-accessibilty';
import { ProposalType } from './proposal-type';

export interface IProposal {
  id: number;
  title: string;
  summary: string;
  glossaries: IGlossary[];
  responsibles: IPerson[];
  contacts: IPerson[];
  createdAt: Date;
  registeredAt: Date;
  deadline: Date;
  electionPeriod: string;
  createdBy: string;
  type: ProposalType;
  accessibility: ProposalAccessibilty;
}
