import { Component } from '@angular/core';
import { MessageService } from './shared/services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private messageService: MessageService) {}

  openAuthMenu() {
    this.messageService.sendMessage('authcheck');
  }
}
