import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Typed from 'typed.js';

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
    {
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make',
    },
    {
      text: 'Here’s another item from the left. ypesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    { text: 'And the final item slides in from the right!' },
  ];

  private typed: any;
  private hasScrolled = false;

  ngAfterViewInit(): void {
    this.animateSplitText();
    this.animateLeftRight();
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

    // Create an instance of Typed.js
    this.typed = new Typed('#typed-text', options);

    // window.addEventListener('scroll', this.onScroll);
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

  private onScroll = () => {
    const scrollPosition = window.scrollY;
    const triggerPoint = 200;

    if (scrollPosition > triggerPoint && !this.hasScrolled) {
      this.hasScrolled = true; // Ensure this happens only once
      this.typed.options.backSpeed = 20; // Set backSpeed for deletion
      this.typed.reset(); // Trigger backspacing effect
    }
  };
}
