import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { DataService } from '../data.service';

interface Risposta{   //risposat in formato json
  validation:  boolean;
  id: number;
}


@Component({
  selector: 'app-ordinazione',
  templateUrl: './ordinazione.component.html',
  styleUrl: './ordinazione.component.css'
})
export class OrdinazioneComponent {
  email:String='';
  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router, private service: DataService) {
    this.form = this.formBuilder.group({
      // Definisci qui i controlli del form
    });
  }
  ordina(){
    if (this.email.includes("@")) {

      const formData={
        email:this.email,
      }
      
      this.http.post<Risposta>('http://localhost:8080/ordina',formData).subscribe(
        (response) => {
          if(response.validation){
            this.service.setId(response.id);
            this.router.navigate(['/menu']);
          }else{
            console.log("errore");
          }
          
        },
        (error) =>{
          console.log(error);
          console.log("nonononono");

        }

      )
    }else{
      console.log("mail non conforme");
    }

  }
}
