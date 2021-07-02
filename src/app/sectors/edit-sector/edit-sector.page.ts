import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonSelect, NavController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
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
    private ionLoader: LoaderService,
    private toastService: ToastService,
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
    this.ionLoader.showLoader();
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
          err => console.log('Error occurred: ' + err.message),
          () => this.ionLoader.hideLoader()
      );
      this.assetTypeItems = Object.keys(this.assetTypes).filter(k => !isNaN(Number(k)));
    });
  }

  get f() {
    return this.sectorForm.controls;
  }

  sectorTypeChange(event: any, element: IonSelect) {
    element.value = event.detail.value;
    element.selectedText = this.assetTypes[event.detail.value];
  }

  updateSector() {
    this.ionLoader.showLoader();
    this.sectorService.updateSector(this.sectorForm.value).subscribe(
      () => this.toastService.presentToastWithOptions('Update Confirmation', `${this.sectorForm.value?.sectorName} updated successfully!`,
        3000, false, true),
      err => console.log(err),
      () => this.ionLoader.hideLoader()
    );
  }
}
