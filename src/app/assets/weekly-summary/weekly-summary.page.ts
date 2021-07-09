import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-weekly-summary',
  templateUrl: './weekly-summary.page.html',
  styleUrls: ['./weekly-summary.page.scss'],
})
export class WeeklySummaryPage implements OnInit {
  weekId: string;
  constructor(private activatedRoute: ActivatedRoute,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('weekId')) {
        this.navCtrl.navigateBack('/assets');
        return;
      }
      this.weekId = paramMap.get('weekId');
    });
  }

}
