
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { DataService } from '../data.service';
import { NumberSymbol } from '@angular/common';

interface Risposta{   //risposat in formato json
  message: String;
  id: number;
}

@Component({
  selector: 'app-tavpiatti',
  templateUrl: './tavpiatti.component.html',
  styleUrl: './tavpiatti.component.css'
})
export class TavpiattiComponent {

  form: FormGroup;
  email: string = '';
  posti: number=0;
  data: string=''; //Date= new Date();
  currentDate: Date;

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router,private servizio: DataService) {
    this.currentDate=new Date();
    this.form = this.formBuilder.group({

    });
  }

  isDataValid(date: string): boolean {
    const inputDate = new Date(date);
    const today = new Date();
    // Reset hours, minutes, seconds, and milliseconds for comparison
    today.setHours(0, 0, 0, 0);
    return inputDate >= today;
  }


  prenotazione() {
    // console.log(this.currentDate);
    // console.log(this.data);
    // if (this.posti<=10 && this.posti>=1 && this.email != ''&& this.email.includes("@") && this.data != null ) {
    //  // 

    //   const formData={
    //     email:this.email,
    //     posti:this.posti,
    //     data:this.data
    //   }

    //   this.http.post<Risposta>('http://localhost:8080/prenota',formData).subscribe(
    //     (response) => {
    //       console.log(response.message);
    //       if(response.message =='si'){

    //         this.servizio.setId(response.id);
    //         this.router.navigate(['/menu']);
      
    //       }else{

    //         console.log("Data indisponibile");
    //         this.router.navigate(['/tavpiatti']);
    //       }
          
    //     },
    //     (error) =>{
    //       console.log(error);
          
    //     }

    //   )
    // }else{
    //   console.log("form non conforme");
    // }

    if (this.posti<=10 && this.posti>=1 && this.email != ''&& this.email.includes("@") && this.isDataValid(this.data) ) {

      const formData={
        email:this.email,
        posti:this.posti,
        data:this.data
      }

      this.http.post<Risposta>('http://localhost:8080/prenota',formData).subscribe(
        (response) => {
          console.log(response.message);
          if(response.message =='si'){

            this.router.navigate(['/menu']);

          }else{
            console.log("Data indisponibile");
            this.router.navigate(['/tavpiatti']);
          }

          
        },
        (error) =>{
          console.log(error);
          
        }

      )
    }else{
      alert('Il form presenta degli errori');
    }
  }
}
