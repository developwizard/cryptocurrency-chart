import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../service/api.service";
import {CommonModule} from "@angular/common";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Router} from "@angular/router";
import {CurrencyService} from "../service/currency.service";

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class CoinListComponent implements OnInit {
  bannerData: any;
  currency: string = "EUR";
  dataSource!: MatTableDataSource<any>;
  //api columns
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService,
              private currencyService: CurrencyService,
              private router: Router) {
  }

  ngOnInit() {
    this.getBannerData();
    this.getAllData();
    this.currencyService.getCurrency().subscribe(currency => {
      this.currency = currency;
      this.getBannerData();
      this.getAllData();
    });
  }

  getBannerData() {
    this.apiService.getTrendingCurrency(this.currency)
      .subscribe(res => {
        this.bannerData = res;
      });
  }

  getAllData() {
    this.apiService.getCurrencyData(this.currency)
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onGoToDetails(row: any): void {
    this.router.navigate(['coin-detail', row.id]);
  }
}
