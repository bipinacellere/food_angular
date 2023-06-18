import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { EditFoodComponent } from './components/edit-food/edit-food.component';
import { FoodListComponent } from './components/food-list/food-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'food-truck-list' },
  { path: 'add-food-truck', component: AddFoodComponent },
  { path: 'edit-food-truck/:id', component: EditFoodComponent },
  { path: 'food-truck-list', component: FoodListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
