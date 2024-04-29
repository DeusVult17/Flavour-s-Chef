import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { DataService } from '../data.service';

interface Risposta{   //risposat in formato json
  message: String;
}

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styleUrl: './prenotazione.component.css'
})
export class PrenotazioneComponent implements OnInit{
  form: FormGroup;
  email: string = '';
  posti: number=0;
  data: string = '';

  ngOnInit(): void {
    console.log(this.servizio.mostra());
  }

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router,private servizio: DataService) {
    this.form = this.formBuilder.group({
      // Definisci qui i controlli del form
    });
  }

  prenotazione() {
    if (this.posti<=10 && this.posti>=1 && this.email != ''&& this.email.includes("@") && this.data != '' ) {

      const formData={
        email:this.email,
        posti:this.posti,
        data:this.data
      }

      
      
      this.http.post<Risposta>('http://localhost:8080/prenota',formData).subscribe(
        (response) => {
          console.log(response.message);
          if(response.message =='si'){
            console.log("tutto apposttto");

            if(this.servizio.mostra()){
              this.router.navigate(['/home']);
            }else{
              this.servizio.cambia();
              this.router.navigate(['/menu']);
            }

            

          }else{
            console.log("Data indisponibile");
            this.router.navigate(['/prenotazione']);
          }
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
