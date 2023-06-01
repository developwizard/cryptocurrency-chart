import {Component} from '@angular/core';
import {CurrencyService} from "./service/currency.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cryptocurrency-chart';
  currencies: Currency[] = [
    {value: 'eur', viewValue: "EUR"},
    {value: 'usd', viewValue: "USD"}
  ];
  selectedCurrency: string = this.currencies[0].value;

  constructor(private currencyService: CurrencyService) {
  }

  onCurrencyChange(value: string) {
    this.currencyService.seCurrency(value);
  }
}

interface Currency {
  value: string;
  viewValue: string;
}
