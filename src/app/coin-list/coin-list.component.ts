import {Component, OnInit} from '@angular/core';
import {ApiService} from "../service/api.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class CoinListComponent {

  getBannerData() {
    this.apiService.getTrendingCurrency("EUR")
      .subscribe(res => {
        this.bannerData = res;
      });
  }

  getAllData() {
    this.apiService.getCurrencyData("EUR")
      .subscribe(res => {
        console.log(res);
      });
  }
}
