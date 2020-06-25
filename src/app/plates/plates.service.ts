import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Plate } from './plate.model';

@Injectable({providedIn: 'root'})
export class PlatesService {
  private plates: Plate[] = [];
  private platesUpdated = new Subject<Plate[]>();

  constructor(private http: HttpClient) {}

  getPlates() {
    this.http
      .get<{message: string, plates: any }>(
        "http://localhost:3000/api/plates"
      )
      .pipe(map((plateData) => {
        return plateData.plates.map(plate => {
          return {
            name: plate.name,
            plateNumber: plate.plateNumber,
            id: plate._id
          };
         });
      }))
      .subscribe(transformedPlates => {
          this.plates = transformedPlates;
          this.platesUpdated.next([...this.plates]);
        });
  }

  getPlateUpdateListener() {
    return this.platesUpdated.asObservable();
  }

  getPlate(id: string) {
    return this.http.get<{_id: string, name: string, plateNumber: string}>(
      'http://localhost:3000/api/plates/' + id
      );
  }

  addPlate(name: string, plateNumber: string) {
    const plate: Plate = {id: null, name: name, plateNumber: plateNumber};
    this.http
      .post<{message: string, plateId: string }>('http://localhost:3000/api/plates', plate)
      .subscribe((responseData) => {
        const id = responseData.plateId;
        plate.id = id;
        this.plates.push(plate);
        this.platesUpdated.next([...this.plates]);
    });
  }

  updatePlate(id: string, name: string, plateNumber: string) {
    const plate: Plate = { id: id, name: name, plateNumber: plateNumber };
    this.http
      .put('http://localhost:3000/api/plates/' + id, plate)
      .subscribe(response => {
        const updatesPlates = [...this.plates];
        const oldPlateIndex = updatesPlates.findIndex(p => p.id === plate.id);
        updatesPlates[oldPlateIndex] = plate;
        this.plates = updatesPlates;
        this.platesUpdated.next([...this.plates]);
      });
  }

  deletePlate(plateId: string) {
    this.http.delete('http://localhost:3000/api/plates/' + plateId)
      .subscribe(() => {
        const updatedPlates = this.plates.filter(plate => plate.id !== plateId);
        this.plates = updatedPlates;
        this.platesUpdated.next([...this.plates]);
      });
  }
}
