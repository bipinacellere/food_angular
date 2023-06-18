import { Food } from '../../shared/food';
import { ApiService } from '../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
})
export class FoodListComponent implements OnInit {
  FoodData: any = [];
  dataSource: MatTableDataSource<Food>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'name',
    'arrival_date',
    'action',
  ];

  constructor(private foodApi: ApiService) {
    this.foodApi.GetFoods().subscribe((data) => {
      this.FoodData = data;
      this.dataSource = new MatTableDataSource<Food>(this.FoodData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngOnInit() {}

  deleteFood(index: number, e) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.foodApi.deleteFood(e.id).subscribe();
    }
  }
}
