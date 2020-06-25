import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Plate } from '../plate.model';
import { PlatesService } from '../plates.service';

@Component({
  selector: 'app-plate-list',
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.css']
})
export class PlateListComponent implements OnInit, OnDestroy {
plates: Plate[]  = [];
private platesSub: Subscription;

 constructor(public platesService: PlatesService) {}

 ngOnInit() {
  this.platesService.getPlates();
  this.platesSub = this.platesService.getPlateUpdateListener().subscribe((plates: Plate[]) => {
    this.plates = plates;
  });
 }

 onDelete(plateId: string) {
  this.platesService.deletePlate(plateId);
}

 ngOnDestroy() {
   this.platesSub.unsubscribe();
 }
}

