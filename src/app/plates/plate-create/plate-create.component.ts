import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PlatesService } from '../plates.service';
import { Plate } from '../plate.model';

@Component({
  selector: 'app-plate-create',
  templateUrl: './plate-create.component.html',
  styleUrls: ['./plate-create.component.css']
})
export class PlateCreateComponent implements OnInit {
  enteredName = '';
  enteredPlate = '';
  plate: Plate;
  private mode = 'create';
  private plateId: string;

  constructor(public platesService: PlatesService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('plateId')) {
        this.mode = 'edit';
        this.plateId = paramMap.get('plateId');
        this.platesService.getPlate(this.plateId).subscribe(plateData => {
          this.plate = {id: plateData._id, name: plateData.name, plateNumber: plateData.plateNumber};
        });
      } else {
        this.mode = 'create';
        this.plateId = null;
      }
    });
  }

  onSavePlate(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.platesService.addPlate(form.value.name, form.value.plateNumber);
    } else {
      this.platesService.updatePlate(
        this.plateId,
        form.value.name,
        form.value.plateNumber
        );
      }
      form.resetForm();
    }
}
