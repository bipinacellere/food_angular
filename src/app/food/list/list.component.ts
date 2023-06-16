import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { FoodService } from '../food.service';

declare var window: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  allFood: Food[] = [];
  deleteModal: any;
  idTodelete: number = 0;

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    this.get();
  }

  get() {
    this.foodService.get().subscribe((data) => {
      this.allFood = data;
    });
  }
  openDeleteModal(id: number) {
    this.idTodelete = id;
    this.deleteModal.show();
  }

  delete() {
    this.foodService.delete(this.idTodelete).subscribe({
      next: (data) => {
        this.allFood = this.allFood.filter(_ => _.id != this.idTodelete)
        this.deleteModal.hide();
      },
    });
  }
}
