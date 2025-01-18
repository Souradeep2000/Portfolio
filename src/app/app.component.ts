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
  externalUrls = [
    'https://art-aficionado.netlify.app/',
    'https://chit-chat-9062.web.app/',
  ];

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Set scroll restoration behavior to 'manual' for custom handling
    window.history.scrollRestoration = 'manual';

    // Listen for navigation end event to reset scroll position
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      });

    this.externalUrls.forEach((url) => {
      fetch(url, { method: 'GET', mode: 'no-cors' }) // Cache reload ensures fresh data is fetched
        .then((response) => {
          console.log(`Preloaded: ${url}`);
        })
        .catch((error) => {
          console.error(`Error preloading: ${url}`, error);
        });
    });
  }
}
