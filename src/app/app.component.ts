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

  constructor(
    private service: AppService
  ) { }

  ngOnInit() {
    this.getDirectories();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value)),
    );
  }

  public getDirectories() {
    this.noData = true;
    this.service.getDirectories().pipe(take(1)).subscribe((data) => {
      this.options = data;
      this.filteredData = data;
      this.noData = false;
    });
  }

  public filter(event: any): void {
    let expresion = new RegExp(`${event.target.value}.*`, "i");
    this.filteredData = this.options.filter(x => expresion.test(x.firstName)
      || expresion.test(x.profession) || expresion.test(x.municipality));
  }
}
