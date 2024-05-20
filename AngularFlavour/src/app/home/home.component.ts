import { Component,OnInit  } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

interface Risposta{   //risposat in formato json
  validation:  boolean
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private myService: DataService,private http: HttpClient) { } // Inietta il service nel costruttore

  ngOnInit(){
    this.myService.setAsporto(false); 
    
    this.http.get<Risposta>('http://localhost:8080/start').subscribe(
        (response) => {
          if(response.validation){

          }else{
            console.log("errore");
          }
          
        },
        (error) =>{
          console.log(error);
          console.log("nonononono");

        }

      )

  }
}




