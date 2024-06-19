import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
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
