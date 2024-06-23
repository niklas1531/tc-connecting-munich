import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-proposal-create-steps',
  standalone: true,
  imports: [],
  templateUrl: './proposal-create-steps.component.html',
  styleUrl: './proposal-create-steps.component.scss',
})
export class ProposalCreateStepsComponent {
  @Output() moveToStep: EventEmitter<number> = new EventEmitter<number>();
  @Input() selected: number;

  public toStep(step: number): void {
    this.moveToStep.next(step);
  }
}
