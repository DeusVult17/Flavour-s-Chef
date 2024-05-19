import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private service: DataService,private router: Router) {}

  ngOnInit() {
    console.log(this.service.getId());
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

    )
  
  }


  comanda(){

    const body={
      id: this.service.getId(),
      piatti: this.orderedDishes
    }

    if(this.service.getId()==0){
      console.log("errore nella ricerca dell'id UTENTE");
      this.router.navigate(['/home']);
    }

    if(this.service.getAsporto()){ 

      this.http.post<Risposta>('http://localhost:8080/comanda',body).subscribe(
        (response) => {
          if(response.validation){
  
            this.router.navigate(['/home']);
          }else{

          }
  
       },
       (error) => {
         console.error('Errore nella richiesta:', error);       
        }
       );

    }else{
      this.http.post<Risposta>('http://localhost:8080/comanda',body).subscribe(
        (response) => {

        if(response.validation){
          
          this.router.navigate(['/home']);
        }else{

          this.router.navigate(['/home']);
        }

        },

      (error) => {
       console.error('Errore nella richiesta:', error);       
      }
     );
    }




  }



  addToOrder(dish: Dish) {

    this.orderedDishes.push(dish);
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