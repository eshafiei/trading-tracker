import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sector } from '../../sectors/models/sector.model';

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

  constructor(private fb: FormBuilder) {
      this.sectorForm = this.fb.group({
        sectorId: [''],
        sectorName: ['', Validators.required],
        active: [true, [Validators.required]],
        userId: ['']
      });
    }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const sectorData = changes.sectorFormData;
    if (sectorData && sectorData.previousValue !== sectorData.currentValue) {
      this.sectorForm.setValue(this.sectorFormData);
    }
  }

  get f() {
    return this.sectorForm.controls;
  }

  save() {
    this.itemEvent.emit(this.sectorForm.value);
  }

}
