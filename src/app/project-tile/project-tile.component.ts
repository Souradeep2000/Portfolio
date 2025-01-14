import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
interface MyProject {
  src: string;
  text: (string | string[])[];
}

@Component({
  selector: 'app-project-tile',
  imports: [CommonModule],
  templateUrl: './project-tile.component.html',
  styleUrl: './project-tile.component.css',
})
export class ProjectTileComponent {
  @Input() project: MyProject = {
    src: '',
    text: [],
  };

  getTextArray(text: (string | string[]) | undefined): string[] {
    if (Array.isArray(text)) {
      return text;
    } else if (typeof text === 'string') {
      return [text];
    } else {
      return [];
    }
  }
}
