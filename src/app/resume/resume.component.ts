import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume',
  imports: [CarouselComponent, CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent {
  icons = [
    'fa-java',
    'fa-js',
    { src: '../../assets/svgs/c.svg' },
    'fa-html5',
    'fa-angular',
    'fa-css3-alt',
    'fa-react',
  ];

  reverseIcons = [
    { src: '../../assets/svgs/mongodb.svg' },
    'fa-git',
    'fa-node',
    { src: '../../assets/svgs/firebase.svg' },
    'fa-github',
    { src: '../../assets/svgs/mysql.svg' },
  ];
}
