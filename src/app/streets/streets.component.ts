import {Component, OnInit} from '@angular/core';
import {Street, StreetService} from "../services/street.service";
import {map, filter} from "rxjs/operators";

@Component({
  selector: 'app-streets',
  templateUrl: './streets.component.html',
  styleUrls: ['./streets.component.css']
})
export class StreetsComponent implements OnInit{

  streets: Street[] = [];
  anzahl: number = 0;
  filterString: string = "";

  constructor(private streetService: StreetService) {
  
  }

  ngOnInit(): void {
    this.streetService.getStreets()
      .subscribe(ergebnis => {
        this.streets = ergebnis;
        this.anzahl = ergebnis.length;
      });
  }

  filter(): void {
    //console.log(this.filterString);
    this.streetService.getStreets().pipe(
      map(streets => streets.filter(
        street => street.name.toLowerCase().includes(this.filterString.toLowerCase())
      ))
    ).subscribe(ergebnis => {
      this.streets = ergebnis;
      this.anzahl = ergebnis.length;
    });
  }
}
