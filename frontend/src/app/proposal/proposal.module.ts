import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProposalRoutingModule } from './proposal-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProposalRoutingModule, SharedModule],
})
export class ProposalModule {}
