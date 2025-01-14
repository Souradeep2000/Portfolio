import { Component } from '@angular/core';
import { ProjectTileComponent } from '../project-tile/project-tile.component';
import { CommonModule } from '@angular/common';

interface MyProject {
  src: string;
  text: (string | string[])[];
}

@Component({
  selector: 'app-portfolio',
  imports: [ProjectTileComponent, CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {
  projects: MyProject[] = [
    {
      src: '../../assets/images/project1.png',
      text: [
        'Art Aficionado',
        'An E-Commerce website to provide handicrafts and hand made gifts for special occasions',
        [
          'Admin Portal',
          'User can add review',
          'Add/remove product to cart',
          'Place online order (upi/cards transactions)',
          'Order History',
          'Password recovery mail',
          'Product spotlight',
        ],
      ],
    },

    {
      src: '../../assets/images/project2.png',
      text: [
        'Chit Chat',
        'A multi-user, cross-platform messaging app.',
        [
          'Firebase login/signup',
          'Change user display picture / details',
          'Create groups / new chat',
          'Real-time send/recieve messages',
        ],
      ],
    },
  ];
}
