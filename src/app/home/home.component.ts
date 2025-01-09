import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  HostListener,
  OnDestroy,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  items: { text: string }[] = [
    {
      text: 'This is the first item with an image and paragraph. ahdua jabude ajhdua kajidjie ajhxuah',
    },
    {
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make',
    },
    {
      text: 'Here’s another item from the left. ypesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    { text: 'And the final item slides in from the right!' },
  ];

  private typed: any;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.initCatAnimation();
    this.animateSplitText();
    this.animateLeftRight();
  }

  ngOnDestroy(): void {
    // Destroy Typed.js instance
    if (this.typed) {
      this.typed.destroy();
    }

    // Kill all ScrollTrigger instances
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Kill all GSAP animations
    gsap.globalTimeline.clear();
  }

  animateSplitText(): void {
    const options = {
      strings: ['My name is Souradeep Gharami'],
      typeSpeed: 80, // Speed at which the text is typed
      backSpeed: 100, // Speed at which the text is erased
      backDelay: 3500, // Delay before the text starts deleting
      startDelay: 500, // Delay before starting to type
      loop: true, // Loop the typing effect
      showCursor: true, // Show blinking cursor
      shuffle: true,
      cursorChar: ' |', // Custom cursor character
    };

    this.typed = new Typed('#typed-text', options);
  }

  animateLeftRight(): void {
    gsap.utils.toArray('.content').forEach((element: any, index: number) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: index % 2 === 0 ? -150 : 150 }, // Alternates direction
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element, // Each content div is its own trigger
            start: 'top 80%', // Animation starts when the div enters the viewport
            end: 'top 20%', // Animation reverses when the div exits this range
            scrub: true, // Smooth animation tied to scroll
            toggleActions: 'play reverse play reverse', // Plays forward on scroll down, reverses on scroll up
          },
        }
      );
    });
  }

  private initCatAnimation(): void {
    gsap.to('.falling-cat', {
      y: window.innerHeight / 2,
      x: 300,
      ease: 'power2.out',
      // rotate: -45,
      scrollTrigger: {
        trigger: '.main-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          // Update the rotation dynamically based on scroll progress
          const progress = self.progress;

          // Calculate the rotation angle based on scroll progress (0 to 45 degrees)
          const rotationValue = progress * -45; // Rotate from 0 to 45 degrees

          // Apply the rotation
          gsap.set('.falling-cat', { rotate: rotationValue });

          // Reset rotation to 0 when scroll ends
          if (self.progress === 1) {
            gsap.set('.falling-cat', { rotate: 0 });
          }
        },
      },
      modifiers: {
        x: (x) => {
          const numericX = parseFloat(x);

          const amplitude = 150; // Higher amplitude for more visible zigzag
          const frequency = 50; // Lower frequency for smoother zigzag
          const zigzagValue =
            amplitude * Math.sin(numericX / frequency) +
            amplitude * Math.sin(numericX / (frequency / 2));

          return `${zigzagValue}px`;
        },
      },
    });
  }
}
