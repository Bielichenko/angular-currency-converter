import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { ExchangeRatesService } from '../exchange-rates.service';
import { HttpClient } from '@angular/common/http'


import { RatesFromServer } from '../types/types';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  firstValue: number | undefined;
  firstCurrency: string = "Select currency";
  secondValue: number | undefined;
  secondCurrency: string = "Select currency";

  ratesFromServer: any;
  crossRate: number | undefined;
  currentOrder: number = 1;

  constructor(public ExchangeRatesService: ExchangeRatesService) { }

  ngOnInit(): void {
    this.ExchangeRatesService.getAllCurrencies().subscribe(ratesObject => {
      this.ratesFromServer = ratesObject;
    });
  }

  changeOrder(order: number) {
    this.currentOrder = order;
  }

  setFirstCurrency(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.firstCurrency = value;
  }

  setSecondCurrency(event: Event) {
    const { value } = event.target as HTMLSelectElement
    this.secondCurrency = value;
  }

  getCrossRate() {
    const getRate = (currency: string) => {
      if (this.ratesFromServer) {
        for (let currencyFromServer in this.ratesFromServer.rates) {
          if (currency === currencyFromServer) {
            return this.ratesFromServer.rates[currency];
          }
        }
      }
      return undefined;
    }

    const firstCurrencyRate: number | undefined = getRate(this.firstCurrency);
    const secondCurrencyRate: number | undefined = getRate(this.secondCurrency);

    if (firstCurrencyRate && secondCurrencyRate) {
      this.crossRate = secondCurrencyRate / firstCurrencyRate;
    }
  };

  ngDoCheck() {
    this.getCrossRate()

    if (this.currentOrder === 1 && this.crossRate) {
      this.firstValue
        ? this.secondValue = Math.round(this.firstValue * this.crossRate * 100) / 100
        : null;
    };

    if (this.currentOrder === -1 && this.crossRate) {
      this.secondValue
        ? this.firstValue = Math.round(this.secondValue / this.crossRate * 100) / 100
        : null;
    };
    // console.log('order', this.currentOrder);
    // console.log('firstValue', this.firstValue);
    // console.log('secondValue', this.secondValue);
    // console.log('crossRate', this.crossRate);
    // console.log('rates', this.rates.rates);
  };
}
