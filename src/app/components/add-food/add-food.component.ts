import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from '../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css'],
})
export class AddFoodComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resetFoodForm') myNgForm;
  foodForm: FormGroup;

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private foodApi: ApiService
  ) {}

  /* Reactive book form */
  submitBookForm() {
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

  /* Submit book */
  submitFoodForm() {
    if (this.foodForm.valid) {
      this.foodApi.AddFood(this.foodForm.value).subscribe((res) => {
        this.ngZone.run(() => this.router.navigateByUrl('/food-truck-list'));
      });
    }
  }
}
