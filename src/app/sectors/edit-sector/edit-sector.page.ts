import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AssetType } from '../models/asset-type.enum';
import { Sector } from '../models/sector.model';
import { SectorsService } from '../sectors.service';

@Component({
  selector: 'app-edit-sector',
  templateUrl: './edit-sector.page.html',
  styleUrls: ['./edit-sector.page.scss'],
})
export class EditSectorPage implements OnInit {
  sector: Sector;
  assetTypes: typeof AssetType = AssetType;
  assetTypeItems: string[] = [];
  selectedType: any;

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private sectorService: SectorsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('sectorId')) {
        this.navCtrl.navigateBack('/sectors');
        return;
      }
      this.sector = this.sectorService.getSector(Number(paramMap.get('sectorId')));
      this.assetTypeItems = Object.keys(this.assetTypes).filter(k => !isNaN(Number(k)));
    });
  }

  assetTypeChange(event: any) {
    this.selectedType = this.assetTypes[event.detail.value];
    this.sector.sectorType = this.selectedType;
  }

  save() {
    this.sectorService.saveSector(this.sector);
  }
}
