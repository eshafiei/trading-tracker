import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.page.html',
  styleUrls: ['./assets.page.scss'],
})
export class AssetsPage implements OnInit {
  currentMonth: string;
  constructor() { }

  ngOnInit() {
    this.currentMonth = new Date().toISOString();
  }

}
