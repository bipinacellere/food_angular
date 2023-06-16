import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from '../food/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  get() {
    console.log("api called");
    return this.http.get<Food[]>('http://localhost:3000/api/food');
  }

  create(payload: Food) {
    return this.http.post<Food>('http://localhost:3000/api/food', payload);
  }

  getById(id: number) {
    return this.http.get<Food>(`http://localhost:3000/api/food/${id}`);
  }

  update(payload: Food) {
    return this.http.put(`http://localhost:3000/api/food/${payload.id}`, payload);
  }
  delete(id:number){
    return this.http.delete<Food>(`http://localhost:3000/api/food/${id}`);
 }
}
