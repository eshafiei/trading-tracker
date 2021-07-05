import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonSelect } from '@ionic/angular';
import { AssetType } from '../../models/asset-type.enum';
import { Sector } from '../../models/sector.model';

@Component({
  selector: 'app-sector-form',
  templateUrl: './sector-form.component.html',
  styleUrls: ['./sector-form.component.scss'],
})
export class SectorFormComponent implements OnInit, OnChanges {
  @Input() isEdit: boolean;
  @Input() sectorFormData: Sector;
  @Output() itemEvent = new EventEmitter<Sector>();
  public sectorForm: FormGroup;
  assetTypes: typeof AssetType = AssetType;
  assetTypeItems: string[] = [];

  constructor(private fb: FormBuilder) {
      this.sectorForm = this.fb.group({
        sectorId: [''],
        sectorName: ['', Validators.required],
        sectorType: [0, [Validators.required]],
        active: [true, [Validators.required]]
      });
    }

  ngOnInit() {
    this.assetTypeItems = Object.keys(this.assetTypes).filter(k => !isNaN(Number(k)));
  }

  ngOnChanges(changes: SimpleChanges) {
    const sectorData = changes.sectorFormData;
    if (sectorData && sectorData.previousValue !== sectorData.currentValue) {
      this.sectorForm.setValue(this.sectorFormData);
    }
  }

  get f() {
    return this.sectorForm.controls;
  }

  sectorTypeChange(event: any, element: IonSelect) {
    element.value = event.detail.value;
    element.selectedText = this.assetTypes[event.detail.value];
  }

  submit() {
    this.itemEvent.emit(this.sectorForm.value);
  }

}
