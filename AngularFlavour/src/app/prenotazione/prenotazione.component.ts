import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';


interface Risposta{   //risposat in formato json
  email: string ;
  posti: number;
  data: string;

}

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styleUrl: './prenotazione.component.css'
})
export class PrenotazioneComponent {
  form: FormGroup;
  email: string = '';
  posti: number=0;
  data: string = '';



  constructor(private formBuilder: FormBuilder,private http: HttpClient) {
    this.form = this.formBuilder.group({
      // Definisci qui i controlli del form
    });
  }

  prenotazione() {
    if (this.posti<=10 && this.posti>=1 && this.email != ''&& this.email.includes("@") && this.data != '' ) {
      console.log("email: ",this.email);
      console.log("posti: ",this.posti);
      console.log("data: ",this.data);
      

      const formData={
        email:this.email,
        posti:this.posti,
        data:this.data
      }

      console.log(formData);
      
      this.http.post<Risposta>('http://localhost:8080/prenota',formData).subscribe(
        (response) => {
          //console.log(response.data);
          console.log(response.email);
          console.log(response.posti);
          console.log(response.data);
          console.log("la dove osano i capobastone");
        },
        (error) =>{
          console.log(error);
          console.log("nonononono");

        }

      )
    }else{
      console.log("fucking moron");
    }
  }
}
