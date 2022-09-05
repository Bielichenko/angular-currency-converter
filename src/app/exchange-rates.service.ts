import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {
  constructor(private _http: HttpClient) {}

  public getRatesFromServer() {
    return this._http.get(`https://cdn.cur.su/api/latest.json`);
  };
}
