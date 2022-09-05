import { Component } from '@angular/core';
import { ExchangeRatesService } from '../exchange-rates.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  ratesFromServer: any;
  UAHrate: number | undefined;
  EURrate: number | undefined;
  USDrate: number | undefined;

  constructor(public ExchangeRatesService: ExchangeRatesService) { }

  ngOnInit(): void {
    this.ExchangeRatesService.getAllCurrencies().subscribe(ratesObject => {
      this.ratesFromServer = ratesObject;
    });
  }

  ngDoCheck() {
    if (this.ratesFromServer) {
      this.USDrate = this.ratesFromServer.rates["UAH"];
      this.EURrate = this.ratesFromServer.rates["UAH"] / this.ratesFromServer.rates['EUR'];
    };
  }
}
