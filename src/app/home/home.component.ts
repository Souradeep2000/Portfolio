import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  items: { text: string }[] = [
    {
      text: 'This is the first item with an image and paragraph. ahdua jabude ajhdua kajidjie ajhxuah',
    },
    { text: 'The second item comes from the right.' },
    { text: 'Here’s another item from the left.' },
    { text: 'And the final item slides in from the right!' },
  ];

  ngAfterViewInit() {
    // Animate each content block
    gsap.utils.toArray('.content').forEach((element: any, index: number) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100 }, // Alternates direction
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element, // Each content div is its own trigger
            start: 'top 70%', // Animation starts when the div enters the viewport
            end: 'top 20%', // Animation reverses when the div exits this range
            scrub: true, // Smooth animation tied to scroll
            toggleActions: 'play reverse play reverse', // Plays forward on scroll down, reverses on scroll up
          },
        }
      );
    });
  }
}
