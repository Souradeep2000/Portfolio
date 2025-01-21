import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Typed from 'typed.js';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import {
  Navigation,
  Pagination,
  Keyboard,
  Mousewheel,
  EffectCoverflow,
} from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  items: {
    text: string;
    path_text?: string;
    link?: string;
    outerLink?: string;
  }[] = [
    {
      text: 'A results-driven software engineer with a passion for building high-quality applications. Known for quickly learning and implementing new technologies. My excellent problem-solving skills and strong collaborative mindset enable me to excel in dynamic, team-oriented environments',
    },
    {
      text: 'I have successfully developed and delivered applications that meet the highest standards of quality and performance. I specialize in crafting optimized solutions by leveraging my expertise in software engineering principles and maintaining a focus on delivering value to users.',
      path_text: 'Check out my resume',
      link: '/souro/resume',
    },
    {
      text: 'I’ve solved 700+ LeetCode problems and challenges on other platforms, honing my algorithmic understanding and problem-solving skills for efficient, creative coding. Check out my LeetCode profile for details',
      path_text: '↗',
      outerLink: 'https://leetcode.com/u/Souro/',
    },
    {
      text: 'Proficient in both front-end and back-end technologies, including JavaScript, TypeScript, Git, Node.js,  Angular/React,  SQL/MongoDB, and more, which I consistently reflect in my personal projects',
    },
  ];

  private typed: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.resetAnimations();
      });
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.initAnimations();
    this.animateSplitText();
    this.createSwipper();
  }

  private initAnimations(): void {
    setTimeout(() => {
      this.initCatAnimation();

      this.animateLeftRight();
    }, 0);
  }

  private resetAnimations(): void {
    gsap.globalTimeline.clear();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    setTimeout(() => {
      this.initAnimations();
    }, 0);
  }

  ngOnDestroy(): void {
    // Destroy Typed.js instance
    if (this.typed) {
      this.typed.destroy();
    }

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    gsap.globalTimeline.clear();
  }

  animateSplitText(): void {
    const options = {
      strings: ['Hi', 'My name is Souradeep Gharami'],
      typeSpeed: 80, // Speed at which the text is typed
      backSpeed: 100, // Speed at which the text is erased
      backDelay: 500, // Delay before the text starts deleting
      startDelay: 1500, // Delay before starting to type
      loop: true, // Loop the typing effect
      showCursor: true, // Show blinking cursor
      shuffle: false,
    };

    this.typed = new Typed('#typed-text', options);
  }

  animateLeftRight(): void {
    gsap.utils.toArray('.content').forEach((element: any, index: number) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: index % 2 === 0 ? -350 : 350 }, // Alternates direction
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
    const catElement = document.querySelector('.falling-cat');
    if (!catElement) {
      return;
    }
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

  private createSwipper(): void {
    const swiperParams: SwiperOptions = {
      modules: [Navigation, Pagination, Keyboard, Mousewheel, EffectCoverflow],
      initialSlide: 2,
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slideToClickedSlide: true,
      allowTouchMove: true,
      mousewheel: false,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 3,
        slideShadows: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        410: {
          slidesPerView: 1.2,
        },
        440: {
          slidesPerView: 1.3,
        },
        540: {
          slidesPerView: 1.5,
        },
        640: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 1.3,
        },
        1280: {
          slidesPerView: 1.5,
        },
        1560: {
          slidesPerView: 2,
        },
      },
    };

    const swiper = new Swiper('.swiper', swiperParams);
  }
}
