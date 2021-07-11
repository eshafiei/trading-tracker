import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/services/message.service';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-assets-summary',
  templateUrl: './assets-summary.page.html',
  styleUrls: ['./assets-summary.page.scss'],
})
export class AssetsSummaryPage implements OnInit {
  selectedMonthYear: string;
  constructor(private navService: NavigationService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.selectedMonthYear = new Date().toISOString();
    this.navService.push('assets-summary/tabs/week/1', { selectedMonth: this.selectedMonthYear });
  }

  dateChanged(event: any) {
    this.selectedMonthYear = event.detail.value;
    this.navService.push('assets-summary/tabs/week/1', { selectedMonth: this.selectedMonthYear });
    this.messageService.sendMessage('dateChanged');
  }
}
