import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { CommunicateService } from '../Shared/service/communicate.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css',
})
export class PlayComponent {
  selectedFile: File | null = null;
  conversations: any = [];
  Creator = {
    Me: 0,
    Bot: 1,
  };

  unsubscribe$ = new Subject<boolean>();

  constructor(private communicateService: CommunicateService) {}

  ngOnInit() {
    this.communicateService.selectedFile$.subscribe((file) => {
      (this.selectedFile = file), (this.conversations = []);
      let chat = {
        text: `Hello and welcome to ${
          this.selectedFile?.name.split('.')[0]
        } pdf! Please feel free to ask questions.`,
        from: this.Creator.Bot,
      };
      this.conversations.push(chat);
    });
  }

  sendQuestion(text: HTMLTextAreaElement): void {
    let question = {
      text: text.value,
      from: this.Creator.Me,
    };
    this.conversations.push(question);
    text.value = '';
    //API CALL TO SEND THE QUESTION
    const questions = { question: question.text };
    this.communicateService
      .sendQuestion(questions)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(async (res) => {
        let botResponse = res.Answer;
        let answer = {
          text: botResponse,
          from: this.Creator.Bot,
        };
        this.conversations.push(answer);
      });
  }
}
