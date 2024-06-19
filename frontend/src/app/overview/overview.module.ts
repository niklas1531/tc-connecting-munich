import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OverviewRoutingModule } from './overview-routing.module';

@NgModule({
  declarations: [
    //Componenten
  ],
  imports: [CommonModule, OverviewRoutingModule, SharedModule],
})
export class OverviewModule {}
