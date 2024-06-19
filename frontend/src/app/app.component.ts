import { Component, OnInit } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Connecting Munich';
  constructor(private themeService: ThemeService) {}
  ngOnInit(): void {
    this.setTheme('light');
  }

  setTheme(mode: 'dark' | 'light') {
    this.themeService.setTheme(mode);
    localStorage.setItem('theme', JSON.stringify(mode));
  }
}
