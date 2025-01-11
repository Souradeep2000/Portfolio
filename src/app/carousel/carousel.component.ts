import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true, // use standalone for Angular 14+ components (if necessary)
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  @Input() icons: (string | any)[] = [];
  @Input() width: string = '110px';
  @Input() height: string = '50px';
  @Input() quantity: number = 10;
  @Input() duration: string = '15s';
  @Input() reverse: boolean = false;

  ngOnInit(): void {}

  getCarouselStyle() {
    return {
      '--width': this.width,
      '--height': this.height,
      '--quantity': this.quantity.toString(),
      '--duration': this.duration,
    };
  }
}
