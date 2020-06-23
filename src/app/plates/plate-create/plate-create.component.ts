import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlatesService } from '../plates.service';

@Component({
  selector: 'app-plate-create',
  templateUrl: './plate-create.component.html',
  styleUrls: ['./plate-create.component.css']
})
export class PlateCreateComponent {
  enteredName = '';
  enteredPlate = '';

  constructor(public platesService: PlatesService) {}

  onAddPlate(form: NgForm) {
    if (form.invalid) {
      return;
    }
   this.platesService.addPlate(form.value.name, form.value.plateNumber);
   form.resetForm();
   }
}
