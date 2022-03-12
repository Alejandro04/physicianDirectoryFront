import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class AppService {
  private url: string = "http://localhost:3000";
  private action = new Subject<string>();
  public actionObservable = this.action.asObservable();

  constructor(
    private http: HttpClient,
  ) {
  }

  public getDirectories(): Observable<any> {
    return this.http.get<any[]>(
      `${this.url}/directories`
    );
  }
}
