import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Assets } from '../../assets/models/asset.model';
import { DatePeriod } from '../../assets/models/date-period.model';
import { AuthorizationService } from '../../auth/services/authorization.service';
import { AssetsSummaryService } from '../assets-summary.service';

@Component({
  selector: 'app-weekly-summary',
  templateUrl: './weekly-summary.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./weekly-summary.page.scss'],
})
export class WeeklySummaryPage implements OnInit {
  weekId: string;
  selectedMonthYear: string;
  userId: string;
  weeklySummaryData: Assets;

  constructor(private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private ref: ChangeDetectorRef,
    private auth: AuthorizationService,
    private assetsSummaryService: AssetsSummaryService) { }

  ngOnInit() {
    this.auth.getIdToken().subscribe(res => {
      this.userId = res.payload.sub;
    });
    this.selectedMonthYear = new Date().toISOString();
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('weekId')) {
        this.weekId = '1';
        return;
      }
      else {
        this.weekId = paramMap.get('weekId');
      }
    });
    this.loadData();
  }

  loadData() {
    const datePeriod = this.getDatePeriod();
    this.assetsSummaryService.getAssets(this.userId, datePeriod.startDate, datePeriod.endDate).subscribe(
      (res: any) => {
        this.weeklySummaryData = res;
        this.ref.detectChanges();
      }
    );
  }

  getDatePeriod(): DatePeriod {
    let dayPeriod = { startDay: 1, endDay: 7 };
    let datePeriod: DatePeriod = {startDate: new Date(), endDate: new Date()};
    const selectedDate = new Date(this.selectedMonthYear);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDay();
    switch (this.weekId) {
      case '1':
        dayPeriod = {
          startDay: 1,
          endDay: 7
        };
        break;
      case '2':
        dayPeriod = {
          startDay: 8,
          endDay: 15
        };
        break;
      case '3':
        dayPeriod = {
          startDay: 16,
          endDay: 23
        };
        break;
      case '4':
        dayPeriod = {
          startDay: 24,
          endDay: 31
        };
        break;
      default:
        dayPeriod = {
          startDay: 1,
          endDay: 7
        };
        break;
    }

    datePeriod = {
      startDate: new Date(year, month, dayPeriod.startDay),
      endDate: new Date(year, month, dayPeriod.endDay)
    };

    return datePeriod;
  }

}
