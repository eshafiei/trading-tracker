import { EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSelect } from '@ionic/angular';
import { AssetType } from '../../../assets/enums/asset-type.enum';
import { Asset } from '../../../assets/models/asset.model';
import { AuthorizationService } from '../../../auth/services/authorization.service';
import { SectorChoices } from '../../../sectors/models/sector-choices.model';
import { SectorsService } from '../../../sectors/sectors.service';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.scss'],
})
export class AssetFormComponent implements OnInit, OnChanges {
  @Input() isEdit: boolean;
  @Input() assetFormData: Asset;
  @Output() itemEvent = new EventEmitter<Asset>();
  @Output() deleteEvent = new EventEmitter<Asset>();
  public assetForm: FormGroup;
  assetTypes: typeof AssetType = AssetType;
  assetTypeItems: string[] = [];
  sectorChoices: SectorChoices[] = [];
  private userId: string;

  constructor(private fb: FormBuilder,
    private sectorService: SectorsService,
    private auth: AuthorizationService) {
    this.assetForm = this.fb.group({
      assetId: [''],
      assetType: [0, Validators.required],
      assetName: ['', Validators.required],
      quantity: [1, Validators.required],
      cost: [0, Validators.required],
      purchaseDate: [new Date().toISOString(), Validators.required],
      sectorId: ['', Validators.required],
      userId: ['']
    });
  }

  ngOnInit() {
    this.auth.getIdToken().subscribe(res => {
      this.userId = res.payload.sub;
    });
    this.assetTypeItems = Object.keys(this.assetTypes).filter(k => !isNaN(Number(k)));
    this.sectorService.getSectorsDropDown(this.userId).subscribe(
      (res: any) => this.sectorChoices= res.sectorChoices,
      (err) => console.log(err)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const assetData = changes.assetFormData;
    if (assetData && assetData.previousValue !== assetData.currentValue) {
      this.assetForm.setValue(this.assetFormData);
    }
  }

  get f() {
    return this.assetForm.controls;
  }

  sectorChange(event: any, element: IonSelect) {
    element.value = event.detail.value;
    element.selectedText = this.sectorChoices[event.detail.value].sectorName;
  }

  save() {
    this.itemEvent.emit(this.assetForm.value);
  }

  delete() {
    this.deleteEvent.emit(this.assetForm.value);
  }

}
