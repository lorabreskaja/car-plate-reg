import { Injectable } from '@angular/core';
import { Plate } from './plate.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PlatesService {
  private plates: Plate[] = [];
  private platesUpdated = new Subject<Plate[]>();

  constructor(private http: HttpClient) {}

  getPlates() {
    this.http.get<{message: string, plates: Plate[]}>('http://localhost:3000/api/posts')
      .subscribe((plateData) => {
        this.plates = plateData.plates;
        this.platesUpdated.next([...this.plates]);
      });
  }

  getPlateUpdateListener() {
    return this.platesUpdated.asObservable();
  }

  addPlate(name: string, plateNumber: string) {
    const plate: Plate = {id: null, name: name, plateNumber: plateNumber};
    this.plates.push(plate);
    this.platesUpdated.next([...this.plates]);
  }

}
