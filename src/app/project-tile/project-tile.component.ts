import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
interface MyProject {
  src: string;
  text: (string | string[])[];
  url: string;
}

@Component({
  selector: 'app-project-tile',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './project-tile.component.html',
  styleUrl: './project-tile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTileComponent {
  @Input() project: MyProject = {
    src: '',
    text: [],
    url: '',
  };

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const isMobile = window.innerWidth < 768; // Adjust threshold as needed
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = isMobile ? '90vw' : '80vw';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.data = { url: this.project.url };

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
  }

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
