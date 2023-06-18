import { Food } from '../../shared/food';
import { ApiService } from '../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-food-list-today',
  templateUrl: './food-list-today.component.html',
})
export class FoodListTodayComponent implements OnInit {
  FoodData: any = [];
  dataSource: MatTableDataSource<Food>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'name',
  ];

  constructor(private foodApi: ApiService) {
    this.foodApi.GetFoods(true).subscribe((data) => {
      this.FoodData = data;
      this.dataSource = new MatTableDataSource<Food>(this.FoodData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngOnInit() {}
}
