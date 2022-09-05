import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

import { RatesFromServer } from './types/types'

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {
  // url = 'https://api.fastforex.io';
  // apiKey = '4dfd7f9bd3-7d7dec0b40-rhol2y';

  constructor(private _http: HttpClient) { }

  // public getAllCurrencies() {
  //   return this._http.get(
  //     `${this.url}/currencies?api_key=${this.apiKey}`,
  //   )
  // };

  public getAllCurrencies() {
    // console.log(this._http.get(`https://cdn.cur.su/api/latest.json`));

    return this._http.get(`https://cdn.cur.su/api/latest.json`)
  };
}

