import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ParticlesBackgroundComponent } from './particles-background/particles-background.component';
import { FooterComponent } from './footer/footer.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    ParticlesBackgroundComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set scroll restoration behavior to 'manual' for custom handling
    window.history.scrollRestoration = 'manual';

    // Listen for navigation end event to reset scroll position
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      });
  }
}
