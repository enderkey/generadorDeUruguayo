import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getName(): Observable<any> {
    return this.http.get<any>('https://api.parser.name/?api_key=0b49933def25e9780e052e444bc9cac4&endpoint=generate&country_code=uy');
  }
}