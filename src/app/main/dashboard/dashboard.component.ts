import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { PlayComponent } from '../play/play.component';
import { PdfComponent } from '../pdf/pdf.component';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChatComponent,PlayComponent,PdfComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
