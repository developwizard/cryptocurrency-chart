import {Component, OnInit} from '@angular/core';
import {ApiService} from "../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class CoinDetailComponent implements OnInit {
  coinData: any;
  coinId!: string;
  days: number = 1;
  currency: string = "EUR";
  constructor(private apiService: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.coinId = val['id'];
      this.getCoinData();
    });
  }

  getCoinData() {
    this.apiService.getCurrencyById(this.coinId)
      .subscribe(res => {
        this.coinData = res;
        console.log(this.coinData);
      });
  }
}
