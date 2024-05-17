import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';


interface Risposta{   //risposta in formato json
  message:string;
  validation:Boolean;
  id:number;
}

@Component({
  selector: 'app-asporto',
  templateUrl: './asporto.component.html',
  styleUrl: './asporto.component.css'
})

export class AsportoComponent {

  form: FormGroup;
  email: string = '';
  data: string = '';

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router,private servizio: DataService) {
    this.form = this.formBuilder.group({
    });

  }

  menu(){

    if(this.email.includes("@") && this.data != ''){

      const formData={
        email:this.email,
        data:this.data
      }

      this.http.post<Risposta>('http://localhost:8080/asporto',formData).subscribe(
        (response) => {
          if(response.validation){      
            this.servizio.setId(response.id);
            this.servizio.setAsporto(true);
            
            this.router.navigate(['/menu']);          
          }else{

            console.log("ERRORE SERVER INTERNO");
            this.router.navigate(['/home']);
          }

        },
        (error) =>{
          console.log(error);
          console.log("nonononono");
          
        }

      )

    }else{
      console.log("form sbagliato");
    }

  }
}
