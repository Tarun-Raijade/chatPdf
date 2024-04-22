import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatpdf';
 
  constructor(private router: Router){}
 
  ngOnInit() {     // Directly route to the Home component   
    this.router.navigate(['/home']);
  }
}
