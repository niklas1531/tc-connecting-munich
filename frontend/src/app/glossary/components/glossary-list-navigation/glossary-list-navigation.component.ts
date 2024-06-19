import { Component } from '@angular/core';
import { GLOSSARY_NAVIGATION_ITEMS } from './glossary-list-navigation.data';

@Component({
  selector: 'app-glossary-list-navigation',
  standalone: true,
  imports: [],
  templateUrl: './glossary-list-navigation.component.html',
  styleUrl: './glossary-list-navigation.component.scss',
})
export class GlossaryListNavigationComponent {
  protected readonly GLOSSARY_NAVIGATION_ITEMS = GLOSSARY_NAVIGATION_ITEMS;
}
