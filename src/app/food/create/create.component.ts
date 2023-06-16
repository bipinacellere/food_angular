import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from '../food';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  foodForm: Food = {
    id: 0,
    name: '',
    arrival_date: ''
  };

  constructor(private foodService: FoodService,
    private router: Router) { }

  ngOnInit(): void { }

  create() {
    this.foodService.create(this.foodForm)
      .subscribe({
        next: (data) => {
          this.router.navigate(["/food/list"])
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}