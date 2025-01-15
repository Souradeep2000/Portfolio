import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SafePipe } from '../safe.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-box',
  imports: [MatDialogModule, MatButtonModule, SafePipe, CommonModule],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css',
})
export class DialogBoxComponent {
  url: string;
  cachedContent: string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { url: string }) {
    this.url = data.url;
  }
}
