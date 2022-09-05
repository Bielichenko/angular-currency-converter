import { Component, OnInit } from '@angular/core';
import { ExchangeRatesService } from '../exchange-rates.service';

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

  ratesDataFromServer: any;
  crossRate: number | undefined;
  currentOrder: number = 1;

  constructor(public ExchangeRatesService: ExchangeRatesService) { }

  ngOnInit(): void {
    this.ExchangeRatesService.getRatesFromServer().subscribe(res => this.ratesDataFromServer = res);
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
  };

  changeOrder(order: number) {
    this.currentOrder = order;
  };

  setFirstCurrency(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.firstCurrency = value;
  };

  setSecondCurrency(event: Event) {
    const { value } = event.target as HTMLSelectElement
    this.secondCurrency = value;
  };

  getCrossRate() {
    const getRate = (currency: string) => {
      if (this.ratesDataFromServer) {
        for (let currencyFromServer in this.ratesDataFromServer.rates) {
          if (currency === currencyFromServer) {
            return this.ratesDataFromServer.rates[currency];
          }
        }
      }
      return undefined;
    };

    const firstCurrencyRate: number | undefined = getRate(this.firstCurrency);
    const secondCurrencyRate: number | undefined = getRate(this.secondCurrency);

    if (firstCurrencyRate && secondCurrencyRate) {
      this.crossRate = secondCurrencyRate / firstCurrencyRate;
    };
  };
}
