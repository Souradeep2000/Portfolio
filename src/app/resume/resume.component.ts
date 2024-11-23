import { AfterViewInit, Component } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-resume',
  imports: [],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent implements AfterViewInit {
  constructor() {}
  isMovingLeft: boolean = false;

  ngAfterViewInit(): void {
    const cat = document.querySelector('.falling-cat') as HTMLElement;

    gsap.to(cat, {
      scrollTrigger: {
        trigger: '.main-container', // Use the body or any specific element for triggering
        toggleActions: 'play pause reverse pause',
        start: 'top 0',
        end: 'bottom center',
        endTrigger: '.spacer',
        markers: true,
        scrub: 5,
        // onEnter: () => console.log('ScrollTrigger animation started'),
        // onUpdate: (self) => console.log('Scroll progress:', self.progress),
      },
      y: () => window.innerHeight, // Moves the cat vertically down the viewport height
      x: () => {
        this.isMovingLeft = !this.isMovingLeft; // Toggle direction with each scroll
        const minX = window.innerWidth - 100;
        const maxX = 50;
        return this.isMovingLeft
          ? gsap.utils.random(minX, window.innerWidth - 50) // Move left
          : gsap.utils.random(maxX, window.innerWidth - 50); // Move right
      },

      // ease: 'power1.inOut',
      // rotation: 360,
      duration: 3,
    });
  }
}
