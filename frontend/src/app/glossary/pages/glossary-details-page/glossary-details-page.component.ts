import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, switchMap, take } from 'rxjs';
import { IGlossary } from '../../../proposal/interfaces/glossary';
import { FrameComponent } from '../../../shared/components/frame/frame.component';
import {
  clearSelectedGlossary,
  getGlossaryById,
} from '../../states/glossary-overview.actions';
import { GlossaryState } from '../../states/glossary-overview.state';

@Component({
  selector: 'app-glossary-details-page',
  standalone: true,
  templateUrl: './glossary-details-page.component.html',
  styleUrl: './glossary-details-page.component.scss',
  imports: [FrameComponent, AsyncPipe],
})
export class GlossaryDetailsPageComponent implements OnInit, OnDestroy {
  @Select(GlossaryState.selectedGlossary)
  selectedGlossary$!: Observable<IGlossary>;
  constructor(private route: ActivatedRoute, private store: Store) {}
  ngOnDestroy(): void {
    this.store.dispatch(new clearSelectedGlossary());
  }
  ngOnInit(): void {
    this.loadGlossary();
  }

  private loadGlossary() {
    this.route.paramMap
      .pipe(
        take(1),
        switchMap((params) =>
          this.store.dispatch(
            new getGlossaryById({ glossaryId: params.get('id') })
          )
        )
      )
      .subscribe();
  }
}
