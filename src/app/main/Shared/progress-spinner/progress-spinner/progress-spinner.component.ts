import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress-spinner',
  standalone: true,
  imports: [],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.css'
})
export class ProgressSpinnerComponent implements OnInit {
  @Input() diameter: any;
  /** Progress spinner settings */
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  // diameter = ;

  constructor() { }

  ngOnInit(): void { }
}
