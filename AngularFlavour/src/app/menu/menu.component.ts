import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
interface Dish {
  id: number;
  nome: string;
  prezzo: number;
}

interface response{
  id: string;
  nome: string;
  prezzo: string;
}

interface Risposta{   //risposat in formato json
  validation:  boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  orderedDishes: Dish[] = [];
  dishes: Dish[] = [

  ];

  selectedDish: number | null = null;


  constructor(private formBuilder: FormBuilder,private http: HttpClient,private service: DataService) {}

  ngOnInit() {
    console.log("BACK2BACK");

    this.http.get<response[]>('http://localhost:8080/menu').subscribe(
      (response) => {

        for(let i=0; i<response.length;i++){
          const dish: Dish = {
            id: parseInt(response[i].id),
            nome: response[i].nome,
            prezzo: parseFloat(response[i].prezzo)
          };
          this.dishes.push(dish);
        }

      },
      (error) =>{
        console.log(error);
        console.log("nonononono");
      },
      () => {
        if (this.selectedDish !== null) {
          this.addToOrder();
        }
      }

    )
  
  }

  comanda(){

    const body={
      id: this.service.getId(),
      piatti: this.orderedDishes
    }

    this.http.post<Risposta>('http://localhost:8080/comanda',body).subscribe(
      (response) => {
        if(response.validation){
          
          
        }else{

        }

     },
     (error) => {
       console.error('Errore nella richiesta:', error);       
      }
     );

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



  removeFromOrder(dish: Dish) {
    const index = this.orderedDishes.indexOf(dish);
    if (index !== -1) {
      this.orderedDishes.splice(index, 1);
    }
  }

}
