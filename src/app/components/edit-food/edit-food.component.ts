import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css'],
})
export class EditFoodComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resetFoodForm') myNgForm;
  foodForm: FormGroup;

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private foodApi: ApiService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.foodApi.GetFood(id).subscribe((data) => {
      this.foodForm = this.fb.group({
        name: [data.name, [Validators.required]],
        arrival_date: [data.arrival_date, [Validators.required]]
      });
    });
  }

  /* Reactive book form */
  updateBookForm() {
    this.foodForm = this.fb.group({
      name: ['', [Validators.required]],
      arrival_date: ['', [Validators.required]]
    });
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.foodForm.get('arrival_date').setValue(convertDate, {
      onlyself: true,
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.foodForm.controls[controlName].hasError(errorName);
  };

  /* Update book */
  updateFoodForm() {
    var id = this.actRoute.snapshot.paramMap.get('id');
        this.foodApi.UpdateFood(id, this.foodForm.value)
        .subscribe({
          next: (data) => {
            this.router.navigateByUrl('/food-truck-list');
          },
          error: (err) => {
            console.log(err);
          }
        })
  }
}
