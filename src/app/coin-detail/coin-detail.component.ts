import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ChartConfiguration, ChartType} from "chart.js";
import {BaseChartDirective, NgChartsModule} from "ng2-charts";
import {CurrencyService} from "../service/currency.service";

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule
  ]
})
export class CoinDetailComponent implements OnInit {
  coinData: any;
  coinId!: string;
  days: number = 30;
  currency: string = "EUR";
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [{
      data: [],
      label: 'Price Trends',
      backgroundColor: 'rgba(148, 159, 177, 0.2)',
      borderColor: '#009688',
      pointBackgroundColor: '#009688',
      pointBorderColor: '#0099688',
      pointHoverBackgroundColor: '#009688',
      pointHoverBorderColor: '#009688'
    }],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  }
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) lineChart!: BaseChartDirective;

  constructor(private apiService: ApiService,
              private currencyService: CurrencyService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.coinId = val['id'];
      this.getCoinData();
      this.getGraphData();
      this.currencyService.getCurrency().subscribe(currency => {
        this.currency = currency;
        this.getCoinData();
        this.getGraphData();
      });
    });
  }

  getCoinData() {
    this.apiService.getCurrencyById(this.coinId)
      .subscribe(res => {
        if (this.currency === "USD") {
          res.market_data.current_price.eur = res.market_data.current_price.usd;
          res.market_data.market_cap.eur = res.market_data.market_cap.usd;
        }
        this.coinData = res;
      });
  }

  getGraphData() {
    this.apiService.getCurrencyChartData(this.coinId, this.currency, this.days)
      .subscribe(res => {
        setTimeout(() => {
          this.lineChart.chart?.update()
        }, 0);
        this.lineChartData.datasets[0].data = res.prices.map((p: any) => {
          return p[1];
        });
        this.lineChartData.labels = res.prices.map((p: any) => {
          let date = new Date(p[0]);
          let time = date.getHours() > 12 ?
            `${date.getHours() - 12}: ${date.getMinutes()} PM` :
            `${date.getHours()}: ${date.getMinutes()} AM`;
          return this.days === 1 ? time : date.toDateString();
        });
      });
  }
}
