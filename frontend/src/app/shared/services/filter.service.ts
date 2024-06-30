import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private state: boolean = false;

  constructor() {}

  public get filterState(): boolean {
    return this.state;
  }

  public setFilterState(state: boolean): void {
    this.state = state;
  }
}
