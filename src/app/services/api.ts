import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getName(nameType:string): Observable<any> {
    return this.http.get<any>(`https://randommer.io/api/Name?nameType=${nameType}&quantity=2&CountryCode=UY`, {
      headers: new HttpHeaders({
        'X-API-KEY' : '9dd4dca7ba3746ad96f81c54a94ce817'
      })
    });
  }
}