import {Component} from '@angular/core';

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
  selectedCurrency = this.currencies[0].value;

  constructor() {
  }
  onCurrencyChange(value: string) {

  }
}

interface Currency {
  value: string;
  viewValue: string;
}
