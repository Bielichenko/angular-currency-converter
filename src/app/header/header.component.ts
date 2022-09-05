import { Component } from '@angular/core';
import { ExchangeRatesService } from '../exchange-rates.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  ratesDataFromServer: any;
  EURrate: number | undefined;
  USDrate: number | undefined;

  constructor(public ExchangeRatesService: ExchangeRatesService) { }

  ngOnInit(): void {
    this.ExchangeRatesService.getRatesFromServer().subscribe(res => {
      this.ratesDataFromServer = res;
    });
  }

  ngDoCheck() {
    if (this.ratesDataFromServer) {
      this.USDrate = this.ratesDataFromServer.rates["UAH"];
      this.EURrate = this.ratesDataFromServer.rates["UAH"] / this.ratesDataFromServer.rates['EUR'];
    };
  }
}
