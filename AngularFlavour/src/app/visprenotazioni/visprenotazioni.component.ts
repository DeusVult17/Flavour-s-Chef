import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { DataService } from '../data.service';

interface prenotazione {
  email: string;
  data: string;
  persone: number;
  tavolo: number;
}

interface Risposta{
  validation: boolean
}

@Component({
  selector: 'app-visprenotazioni',
  templateUrl: './visprenotazioni.component.html',
  styleUrl: './visprenotazioni.component.css'
})
export class VisprenotazioniComponent implements OnInit {
  reservations: prenotazione[] = [];
  selectedReservation: prenotazione | null = null;

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit() {
    this.http.get<prenotazione[]>('http://localhost:8080/vispreno').subscribe(
      (response) => {
        this.reservations = response;
      },
      (error) => {
        console.error('Errore nel caricamento delle prenotazioni:', error);
      }
    );
  }


  selectReservation(reservation: prenotazione) {
    this.selectedReservation = reservation;
  }

  elimina() {
    if (this.selectedReservation != null) {   
      console.log(this.selectedReservation.email);

      const body={
        email: this.selectedReservation.email,
        data: this.selectedReservation.data,
        tavolo: this.selectedReservation.tavolo,
      }

      this.http.post<Risposta>('http://localhost:8080/elimina',body).subscribe(
        (response) => {
           if(response.validation){
            this.router.navigate(['/admin']);
           }else{
            console.error("errore nella eliminazione della prenotazione");
           }
        },
        (error) => {
          console.error('Errore:', error);
        }
      );


    }else{
    }
  }


}
