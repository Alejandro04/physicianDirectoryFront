import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'directory';
  myControl = new FormControl();
  options: any[] = [
    { firstName: "Alejo", profession: "Pediatra" },
    { firstName: "Leo", profession: "Odontologo" },
    { firstName: "Ana", profession: "Internista" },
  ];
  filteredOptions: any;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): any[] {
    let expresion = new RegExp(`${value}.*`, "i");
    let filteredData = this.options.filter(x => expresion.test(x.firstName) || expresion.test(x.profession));
    return filteredData;
  }
}
