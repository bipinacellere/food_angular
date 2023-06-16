import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../food';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  foodForm: Food = {
    id: 0,
    name: '',
    arrival_date:''
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.getById(id); 
    });
  }

  getById(id: number) {
    this.foodService.getById(id).subscribe((data) => {
      this.foodForm = data;
    });
  }

  update() {
    this.foodService.update(this.foodForm)
      .subscribe({
        next: (data) => {
          this.router.navigate(["/food/list"]);
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}