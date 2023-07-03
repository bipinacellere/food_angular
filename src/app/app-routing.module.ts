import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { EditFoodComponent } from './components/edit-food/edit-food.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { FoodListTodayComponent } from './components/food-list-today/food-list-today.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'food-truck-list-today' },
  { path: 'add-food-truck', component: AddFoodComponent,canActivate: [AuthGuard]  },
  { path: 'edit-food-truck/:id', component: EditFoodComponent,canActivate: [AuthGuard]  },
  { path: 'food-truck-list', component: FoodListComponent, canActivate: [AuthGuard] },
  { path: 'food-truck-list-today', component: FoodListTodayComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
