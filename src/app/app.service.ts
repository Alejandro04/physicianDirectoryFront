import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Subject } from 'rxjs';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AppService {
  private url: string = "https://physician-directory-api.vercel.app";
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
