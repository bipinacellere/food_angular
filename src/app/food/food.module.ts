import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FoodRoutingModule,
    
  ]
})
export class FoodModule { }
