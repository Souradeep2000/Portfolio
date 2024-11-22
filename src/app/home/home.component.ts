import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, HostListener } from '@angular/core';
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
  private cat: HTMLElement | null = null;
  private isScrolling: boolean = false;

  // Initial position when the page loads
  private initialTop = -100; // Top position of the cat when it's hidden
  private initialLeft = 50;

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.scrollY;
    const viewportWidth = window.innerWidth; // Get the viewport width

    if (this.cat) {
      // Apply falling effect (moving down)
      const fallDistance = scrollPosition + 300; // Adjust this value for how far the cat falls

      // Apply zigzag movement based on scroll position within the visible area
      const zigzag = (scrollPosition % 200) - 100; // Creates a zigzag motion
      const boundedZigzag = Math.max(Math.min(zigzag, 40), -40); // Restrict horizontal movement to within 40% of the viewport width

      // Use GSAP to animate cat's movement
      gsap.to(this.cat, {
        top: fallDistance + 'px', // Move down as the page scrolls
        left: this.initialLeft + boundedZigzag + '%', // Constrained zigzag horizontal movement
        ease: 'none', // Linear movement
      });
    }
  }

  private typed: any;
  private hasScrolled = false;

  ngAfterViewInit(): void {
    this.cat = document.querySelector('.falling-cat');
    if (this.cat) {
      this.cat.style.top = `${this.initialTop}px`;
      this.cat.style.left = `${this.initialLeft}%`;
    }
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

  startFallingAnimation(scrollPosition: number): void {
    if (this.cat) {
      // GSAP animation for zigzag and fall effect
      gsap.to(this.cat, {
        duration: 5, // Adjust duration based on scroll speed
        top: () => `${scrollPosition + 200}px`, // Fall effect
        left: () => `${Math.random() * 50 + 10}%`, // Zigzag movement (random horizontal movement)
        ease: 'none', // Keeps it linear (no easing)
        onUpdate: () => {
          // Update position as the user scrolls
          const updatedScrollPosition = window.scrollY;
          gsap.to(this.cat, {
            top: `${updatedScrollPosition + 200}px`, // Update the Y position as user scrolls
            left: `${Math.random() * 50 + 10}%`, // Update the X position for zigzag effect
          });
        },
        onComplete: () => {
          // Once animation is complete, stop the cat from moving further
          gsap.set(this.cat, { top: `${scrollPosition + 200}px`, left: '50%' });
        },
      });
    }
  }
}
