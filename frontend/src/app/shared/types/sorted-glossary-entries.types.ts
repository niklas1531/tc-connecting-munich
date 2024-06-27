import { GlossaryNavigationItem } from '../../glossary/components/glossary-list-navigation/glossary-list-navigation.data';
import { IGlossary } from '../../proposal/interfaces/glossary';

export interface characterSortedGlossaryEntries {
  character: GlossaryNavigationItem;
  entries: IGlossary[];
}
