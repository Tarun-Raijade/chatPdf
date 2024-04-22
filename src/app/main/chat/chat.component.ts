import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommunicateService } from '../Shared/service/communicate.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatTooltipModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent implements OnInit, OnDestroy {
  history: { id: number; key: string }[] = [];
  selectedFile: File | null = null;
  unsubscribe$ = new Subject<void>();

  constructor(private communicateService: CommunicateService) { }

  ngOnInit(): void {
    this.communicateService.selectedFile$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((file) => {
        this.selectedFile = file;
        const newItem: any = { id: this.history.length + 1, key: this.selectedFile?.name };
        this.history.push(newItem);
      });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.communicateService.setSelectedFile(file);
    if (file) {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      this.communicateService
        .sendPDF(formData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (res) => {
            // Handle response if needed
          }
        );
    }
  }

  openChat(item: any): void {
    console.log('🚀 ~ item:', item);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
