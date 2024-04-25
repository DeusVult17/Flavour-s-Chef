import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Dish {
  id: number;
  name: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  orderedDishes: Dish[] = [];
  dishes: Dish[] = [
    { id: 1, name: 'Pizza' },
    { id: 2, name: 'Pasta' },
    { id: 3, name: 'Salad' }
  ];

  selectedDish: number | null = null;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    console.log("BACK2BACK");
  }

  addToOrder() {
    const selectedDish = this.dishes.find(dish => dish.id === this.selectedDish);
    console.log(selectedDish);
    if (selectedDish) {
      console.log("TUCA DONKA");
      this.orderedDishes.push(selectedDish);
    }
  }

  onDishChange(event: any) {
    this.selectedDish = parseInt(event.target.value);
  }
}
