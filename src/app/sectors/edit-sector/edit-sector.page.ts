import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonSelect, NavController } from '@ionic/angular';
import { AssetType } from '../models/asset-type.enum';
import { Sector } from '../models/sector.model';
import { SectorsService } from '../sectors.service';

@Component({
  selector: 'app-edit-sector',
  templateUrl: './edit-sector.page.html',
  styleUrls: ['./edit-sector.page.scss'],
})
export class EditSectorPage implements OnInit {
  public sectorForm: FormGroup;
  assetTypes: typeof AssetType = AssetType;
  assetTypeItems: string[] = [];

  constructor(private route: ActivatedRoute,
    private navCtrl: NavController,
    private sectorService: SectorsService,
    private fb: FormBuilder) {
      this.sectorForm = this.fb.group({
        sectorId: [''],
        sectorName: ['test', Validators.required],
        sectorType: [0, [Validators.required]],
        active: [false, [Validators.required]]
      });
    }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('sectorId')) {
        this.navCtrl.navigateBack('/sectors');
        return;
      }
      this.sectorService.getSector(paramMap.get('sectorId')).subscribe(
          (res: Sector) => {
            this.sectorForm.setValue({
              sectorId: res.sectorId,
              sectorName: res.sectorName,
              sectorType: res.sectorType,
              active: res.active
            });
          },
          err => console.log('Error occurred: ' + err.message)
      );
      this.assetTypeItems = Object.keys(this.assetTypes).filter(k => !isNaN(Number(k)));
    });
    console.log(this.f.sectorType.value);
  }

  get f() {
    return this.sectorForm.controls;
  }

  sectorTypeChange(event: any, element: IonSelect) {
    element.value = event.detail.value;
    element.selectedText = this.assetTypes[event.detail.value];
  }

  save() {
    this.sectorService.saveSector(this.sectorForm.value);
  }
}
