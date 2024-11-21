import { AfterViewInit, Component } from '@angular/core';
declare var particlesJS: any;

@Component({
  selector: 'app-particles-background',
  imports: [],
  templateUrl: './particles-background.component.html',
  styleUrl: './particles-background.component.css',
})
export class ParticlesBackgroundComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    this.loadParticlesJs();
  }

  loadParticlesJs(): void {
    // Ensure that particles.js is loaded in the browser
    if (
      typeof window !== 'undefined' &&
      !document.querySelector('script[src="particles.js"]')
    ) {
      const script = document.createElement('script');
      script.src = 'assets/particles.js'; // Path where particles.js is stored in the assets folder
      script.onload = () => {
        particlesJS.load('particles-js', 'assets/particles.json', () => {
          console.log('Particles.js loaded successfully!');
        });
      };
      document.head.appendChild(script);
    }
  }
}
