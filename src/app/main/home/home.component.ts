import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicateService } from '../Shared/service/communicate.service';
import { HttpClientModule } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerService } from '../Shared/service/spinner.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  unsubscribe$ = new Subject<boolean>();

  constructor(private router: Router, private communicateService: CommunicateService, private _spinner: SpinnerService,
  ) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.communicateService.setSelectedFile(file);
    if (file) {
      //this._spinner.showSpinner();
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      this.router.navigate(['/dashboard']);

      //API TO SEND THE PDF
      this.communicateService.sendPDF(formData).pipe(takeUntil(this.unsubscribe$)).subscribe(
        async (res) => {
          //  this._spinner.stopSpinner();
          this.router.navigate(['/dashboard']);
        })
    }
  }
}



