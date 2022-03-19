import { Component } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AppService } from './app.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public noData: boolean = false;
  public myControl = new FormControl();
  public options: any[] = [];
  public filteredOptions: any;
  public filteredData: any[] = this.options;
  public faqEnabled: boolean = false;
  public directoryEnabled: boolean = true;

  constructor(
    private service: AppService
  ) { }

  ngOnInit() {
    this.getDirectories();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  public getDirectories() {
    this.noData = true;
    this.service.getDirectories().pipe(take(1)).subscribe((data) => {

      const newData = data.map((item: any) => {
        return {
          firstName: item.firstName,
          lastName: item.lastName,
          profession: item.profession,
          photo: item.photo,
          phoneNumber:  item.phoneNumber,
          officeAddress: item.officeAddress,
          municipality: item.municipality,
          schedule: item.schedule,
          typeSchedule: item.typeSchedule,
          allData: item.firstName + ' ' + item.lastName + ' - ' + item.profession
        }
      });

      this.options = newData;
      this.filteredData = newData;
      this.noData = false;
    });
  }

  private _filter(value: string): any[] {
    let expresion = new RegExp(`${value}.*`, "i");
    this.filteredData = this.options.filter(x => expresion.test(x.allData));

    const filteredDataAutocomplete = this.filteredData;
    return filteredDataAutocomplete;
  }

  public enabledPage(value: string): void {
    if (value === 'faq') {
      this.faqEnabled = true;
      this.directoryEnabled = false;
    }
    if (value === 'directory') {
      this.faqEnabled = false;
      this.directoryEnabled = true;
    }
  }
}
