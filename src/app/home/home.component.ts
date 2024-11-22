import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';
import _ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(_ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  constructor(private router: Router) {}

  // isActive(route: string): boolean {
  //   return this.router.url === route;
  // }

  paragraphs: string[] = [
    'This is the first paragraph coming from the left.',
    'This is the second paragraph coming from the right.',
    'Here’s another paragraph from the left.',
    'And yet another from the right!',
  ];

  ngAfterViewInit(): void {
    gsap.utils.toArray('p').forEach((element: any, index: number) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100 }, // Left or right based on index
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 70%', // Animation starts when the paragraph is 80% into the viewport
            end: 'top 25%',
            scrub: true,
            toggleActions: 'play none none reverse', // Animates when scrolling forward, reverses when scrolling back
          },
        }
      );
    });
  }
}
