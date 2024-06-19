import { Component } from '@angular/core';
import { GlossaryListNavigationComponent } from '../glossary-list-navigation/glossary-list-navigation.component';

@Component({
  selector: 'app-glossary-list',
  standalone: true,
  templateUrl: './glossary-list.component.html',
  styleUrl: './glossary-list.component.scss',
  imports: [GlossaryListNavigationComponent],
})
export class GlossaryListComponent {}
